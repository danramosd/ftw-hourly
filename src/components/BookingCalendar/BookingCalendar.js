import React, { useEffect, useState, useRef } from 'react';
import { IconArrowHead, IconSpinner } from '../../components';
import useWindowSize from '../../hooks/useWindowSize';
import {
  DayPickerSingleDateController,
  isSameDay,
  isInclusivelyBeforeDay,
  isInclusivelyAfterDay,
} from 'react-dates';
import { monthIdString, monthIdStringInUTC, stringifyDateToISO8601 } from '../../util/dates';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import FieldSelect from '../../components/FieldSelect/FieldSelect';
import {
  ensureBooking,
  ensureAvailabilityException,
  ensureDayAvailabilityPlan,
} from '../../util/data';
import moment from 'moment';
import memoize from 'lodash/memoize';
import classNames from 'classnames';
import css from '../../forms/EditListingAvailabilityForm/ManageAvailabilityCalendar.module.css';
import { confirmCardPaymentSuccess } from '../../ducks/stripe.duck';
import get from 'lodash/get';
import chalk from 'chalk';

const HORIZONTAL_ORIENTATION = 'horizontal';
const MAX_AVAILABILITY_EXCEPTIONS_RANGE = 365;
const MAX_BOOKINGS_RANGE = 180;
const TODAY_MOMENT = moment().startOf('day');
const END_OF_RANGE_MOMENT = TODAY_MOMENT.clone()
  .add(MAX_AVAILABILITY_EXCEPTIONS_RANGE - 1, 'days')
  .startOf('day');

// Constants for calculating day width (aka table cell dimensions)
const TABLE_BORDER = 2;
const TABLE_COLUMNS = 7;
const MIN_CONTENT_WIDTH = 272;
const MIN_CELL_WIDTH = Math.floor(MIN_CONTENT_WIDTH / TABLE_COLUMNS); // 38
const MAX_CONTENT_WIDTH_DESKTOP = 350;
const MAX_CELL_WIDTH_DESKTOP = Math.floor(MAX_CONTENT_WIDTH_DESKTOP / TABLE_COLUMNS); // 108
const VIEWPORT_LARGE = 1024;

// Helper functions

// Calculate the width for a calendar day (table cell)
const dayWidth = (wrapperWidth, windowWith) => {
  if (windowWith >= VIEWPORT_LARGE) {
    // NOTE: viewportLarge has a layout with sidebar.
    // In that layout 30% is reserved for paddings and 282 px goes to sidebar and gutter.
    const width = windowWith * 0.6 - 282;
    return width > MAX_CONTENT_WIDTH_DESKTOP
      ? MAX_CELL_WIDTH_DESKTOP
      : Math.floor((width - TABLE_BORDER) / TABLE_COLUMNS);
  } else {
    return wrapperWidth > MIN_CONTENT_WIDTH
      ? Math.floor((wrapperWidth - TABLE_BORDER) / TABLE_COLUMNS)
      : MIN_CELL_WIDTH;
  }
};

// Get a function that returns the start of the previous month
const prevMonthFn = currentMoment =>
  currentMoment
    .clone()
    .subtract(1, 'months')
    .startOf('month');

// Get a function that returns the start of the next month
const nextMonthFn = currentMoment =>
  currentMoment
    .clone()
    .add(1, 'months')
    .startOf('month');

// outside range -><- today ... today+MAX_AVAILABILITY_EXCEPTIONS_RANGE -1 -><- outside range
const isDateOutsideRange = date => {
  return (
    !isInclusivelyAfterDay(date, TODAY_MOMENT) || !isInclusivelyBeforeDay(date, END_OF_RANGE_MOMENT)
  );
};
const isOutsideRange = memoize(isDateOutsideRange);

const isBooked = (bookings, day) => {
  return !!bookings.find(b => {
    const booking = ensureBooking(b);
    const start = booking.attributes.start;
    const end = booking.attributes.end;
    const dayInUTC = day.clone().utc();

    // '[)' means that the range start is inclusive and range end is exclusive
    return dayInUTC.isBetween(moment(start).utc(), moment(end).utc(), null, '[)');
  });
};

const findException = (exceptions, day) => {
  return exceptions.find(exception => {
    const availabilityException = ensureAvailabilityException(exception.availabilityException);
    const start = availabilityException.attributes.start;
    const dayInUTC = day.clone().utc();
    return isSameDay(moment(start).utc(), dayInUTC);
  });
};

const isBlocked = (availabilityPlan, exception, date) => {
  const planEntries = ensureDayAvailabilityPlan(availabilityPlan).entries;
  const planEntry = planEntries.find(
    weekDayEntry => weekDayEntry.dayOfWeek === DAYS_OF_WEEK[date.isoWeekday() - 1]
  );
  const seatsFromPlan = planEntry ? planEntry.seats : 0;

  const seatsFromException =
    exception && ensureAvailabilityException(exception.availabilityException).attributes.seats;

  const seats = exception ? seatsFromException : seatsFromPlan;
  return seats === 0;
};

const dateModifiers = (availabilityPlan, exceptions, bookings, date) => {
  const exception = findException(exceptions, date);

  return {
    isOutsideRange: isOutsideRange(date),
    isSameDay: isSameDay(date, TODAY_MOMENT),
    isBlocked: isBlocked(availabilityPlan, exception, date),
    isBooked: isBooked(bookings, date),
    isFailed: exception && exception.error,
  };
};

const renderDayContents = (calendar, availabilityPlan) => date => {
  // This component is for day/night based processes. If time-based process is used,
  // you might want to deal with local dates using monthIdString instead of monthIdStringInUTC.
  // console.log('day content', calendar, availabilityPlan, date);

  const currentMonth = monthIdStringInUTC(date);
  const { exceptions = [], bookings = [] } = calendar[monthIdStringInUTC(date)] || {};
  const { isOutsideRange } = dateModifiers(availabilityPlan, exceptions, bookings, date);
  // const [currentMonth] = Object.keys(calendar);
  if (!calendar[currentMonth]) {
    return null;
  }

  console.log('currentMonth', calendar[currentMonth], currentMonth);

  const timeSlots = calendar[currentMonth].timeSlots || [];
  const availableTimeSlots = timeSlots.map(timeSlot => moment(timeSlot.attributes.start).utc());
  const isAvailable = availableTimeSlots.find(slot => isSameDay(slot, date));
  const dayClasses = classNames(css.default, {
    [css.outsideRange]: isOutsideRange,
    [css.today]: isSameDay(date, TODAY_MOMENT),
    [css.blocked]: !isAvailable,
  });

  return (
    <div className={css.dayWrapper}>
      <span className={dayClasses}>
        <span className={css.dayNumber}>{date.format('D')}</span>
      </span>
    </div>
  );
};

const BookingCalendar = props => {
  const {
    listingId,
    timeZone = 'UTC/Etc',
    onFetchTimeSlots,
    availability,
    availabilityPlan,
    publicData,
    price: unitPrice,
  } = props;

  const { pricePerAdditionalPerson, maxPeople } = publicData;
  const optionsKey = [...Array(maxPeople + 1).keys()].slice(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(moment().startOf('day'));
  const dayPickerWrapper = useRef(null);
  const dayPicker = useRef(null);
  useEffect(() => {
    const start = new Date();
    const end = new Date();
    end.setMonth(end.getMonth() + 1);
    fetchMonthlyAvailability(start, end);
  }, []);

  const fetchMonthlyAvailability = (start, end) => {
    onFetchTimeSlots(listingId, start, end, timeZone);
  };

  const onDateChange = date => {
    setSelectedDate(date);
  };
  const onFocusChange = () => {};

  const onMonthClick = monthFn => {
    const nextMonth = monthFn(currentMonth, timeZone);
    setCurrentMonth(nextMonth);

    const start = new Date(nextMonth);
    const end = new Date(nextMonthFn(nextMonth));
    console.log('start', start, end);

    fetchMonthlyAvailability(start, end);
  };

  const handleFormSubmit = () => {};

  const date = null;
  const width = get(dayPickerWrapper, 'current.clientWidth', 0);
  const hasWindow = typeof window !== 'undefined';
  const windowWidth = hasWindow ? useWindowSize().width : 0;
  const daySize = dayWidth(width, windowWidth);
  const calendarGridWidth = daySize * TABLE_COLUMNS + TABLE_BORDER;
  const classes = classNames(css.root);

  return (
    <FinalForm
      // {...rest}
      unitPrice={unitPrice}
      onSubmit={handleFormSubmit}
      render={fieldRenderProps => {
        const {
          endDatePlaceholder,
          startDatePlaceholder,
          formId,
          handleSubmit,
          intl,
          isOwnListing,
          submitButtonWrapperClassName,
          unitType,
          values,
          timeSlots,
          fetchTimeSlotsError,
          lineItems,
          fetchLineItemsInProgress,
          fetchLineItemsError,
        } = fieldRenderProps;
        const { startDate, endDate } = values && values.bookingDates ? values.bookingDates : {};
        const bookingStartDate =
          values.bookingStartDate && values.bookingStartDate.date
            ? values.bookingStartDate.date
            : null;

        return (
          <div className={classes} ref={dayPickerWrapper}>
            <FieldSelect id="people" name="people" className={css.field}>
              <option disabled value="">
                Additional People
              </option>

              <option value={0}>0</option>
              {optionsKey.map(key => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
              {/* {countryCodes.map(country => {
            return (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            );
          })} */}
            </FieldSelect>
            {width > 0 ? (
              <div style={{ width: `${calendarGridWidth}px` }}>
                <DayPickerSingleDateController
                  ref={dayPicker}
                  numberOfMonths={1}
                  navPrev={<IconArrowHead direction="left" />}
                  navNext={<IconArrowHead direction="right" />}
                  weekDayFormat="ddd"
                  daySize={daySize}
                  renderDayContents={renderDayContents(availability, availabilityPlan)}
                  focused={true}
                  date={date}
                  onDateChange={onDateChange}
                  onFocusChange={onFocusChange}
                  onPrevMonthClick={() => onMonthClick(prevMonthFn)}
                  onNextMonthClick={() => onMonthClick(nextMonthFn)}
                  hideKeyboardShortcutsPanel
                  horizontalMonthPadding={9}
                  renderMonthElement={({ month }) => (
                    <div className={css.monthElement}>
                      <span className={css.monthString}>{month.format('MMMM YYYY')}</span>
                      {/* {!isMonthDataFetched ? <IconSpinner rootClassName={css.monthInProgress} /> : null} */}
                    </div>
                  )}
                />
              </div>
            ) : null}
          </div>
        );
      }}
    />
  );
};
export default BookingCalendar;
