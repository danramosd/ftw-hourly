import React, { Component } from 'react';
import { string, bool, arrayOf, array, func } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import classNames from 'classnames';
import moment from 'moment';
import { required, bookingDatesRequired, composeValidators } from '../../util/validators';
import {
  START_DATE,
  END_DATE,
  timeOfDayFromLocalToTimeZone,
  resetToStartOfDay,
  dateIsAfter,
  isInRange,
} from '../../util/dates';
import { propTypes } from '../../util/types';
import config from '../../config';
import {
  Form,
  IconSpinner,
  PrimaryButton,
  FieldDateRangeInput,
  FieldDateInput,
} from '../../components';
import EstimatedBreakdownMaybe from './EstimatedBreakdownMaybe';
import FieldSelect from '../../components/FieldSelect/FieldSelect';
import { SingleDatePicker } from 'react-dates';
import get from 'lodash/get';
import css from './BookingDatesForm.module.css';

const selectedTimeSlot = timeSlots => {
  const months = Object.keys(timeSlots);
  const slots = timeSlots[months[0]].timeSlots;
  return slots.find(t => isInRange(startTimeAsDate, t.attributes.start, t.attributes.end));
};

const identity = v => v;

const timezone = 'UTC/Etc';
export class BookingDatesFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { focusedInput: null, dateFocused: false, date: null };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onFocusedInputChange = this.onFocusedInputChange.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.isOutsideRange = this.isOutsideRange.bind(this);
  }

  componentDidMount() {
    const { listingId, timeZone } = this.props;
    const start = new Date();
    const end = new Date();
    end.setMonth(end.getMonth() + 1);
    this.props.onFetchTimeSlots(listingId.uuid, start, end, timezone);
  }

  // Function that can be passed to nested components
  // so that they can notify this component when the
  // focused input changes.
  onFocusedInputChange(focusedInput) {
    this.setState({ focusedInput });
  }

  handleDateChange(date) {
    this.setState({
      date,
    });
  }

  isOutsideRange(day, bookingStartDate, selectedTimeSlot, timeZone) {
    if (!selectedTimeSlot) {
      return true;
    }

    // 'day' is pointing to browser's local time-zone (react-dates gives these).
    // However, bookingStartDate and selectedTimeSlot refer to times in listing's timeZone.
    const localizedDay = timeOfDayFromLocalToTimeZone(day, timeZone);
    // Given day (endDate) should be after the start of the day of selected booking start date.
    const startDate = resetToStartOfDay(bookingStartDate, timeZone);
    // 00:00 would return wrong day as the end date.
    // Removing 1 millisecond, solves the exclusivity issue.
    const inclusiveEnd = new Date(selectedTimeSlot.attributes.end.getTime() - 1);
    // Given day (endDate) should be before the "next" day of selected timeSlots end.
    const endDate = resetToStartOfDay(inclusiveEnd, timeZone, 1);
    return !(dateIsAfter(localizedDay, startDate) && dateIsAfter(endDate, localizedDay));
  }

  // In case start or end date for the booking is missing
  // focus on that input, otherwise continue with the
  // default handleSubmit function.
  handleFormSubmit(e) {
    console.log('e', e, e.bookingDate.date);

    this.props.onSubmit({
      quantity: 1,
      bookingDate: e.bookingDate.value,
      people: e.people,
    });
  }

  // When the values of the form are updated we need to fetch
  // lineItems from FTW backend for the EstimatedTransactionMaybe
  // In case you add more fields to the form, make sure you add
  // the values here to the bookingData object.
  handleOnChange(formValues) {
    const bookingDate = get(formValues, 'values.bookingDate.date', null);
    const people = get(formValues, 'values.people', null);
    const { listingId, isOwnListing } = this.props;

    if (bookingDate && people && !this.props.fetchLineItemsInProgress) {
      this.props.onFetchTransactionLineItems({
        bookingData: { bookingDate, people },
        listingId,
        isOwnListing,
      });
    }
  }

  render() {
    const { rootClassName, className, publicData, price: unitPrice, ...rest } = this.props;
    const classes = classNames(rootClassName || css.root, className);
    const { pricePerAdditionalPerson, maxPeople } = publicData;
    const optionsKey = [...Array(maxPeople + 1).keys()].slice(1);
    if (!unitPrice) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingDatesForm.listingPriceMissing" />
          </p>
        </div>
      );
    }
    if (unitPrice.currency !== config.currency) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingDatesForm.listingCurrencyInvalid" />
          </p>
        </div>
      );
    }

    return (
      <FinalForm
        {...rest}
        unitPrice={unitPrice}
        onSubmit={this.handleFormSubmit}
        render={fieldRenderProps => {
          const {
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

          const timeSlotsError = fetchTimeSlotsError ? (
            <p className={css.sideBarError}>
              <FormattedMessage id="BookingDatesForm.timeSlotsError" />
            </p>
          ) : null;

          // This is the place to collect breakdown estimation data.
          // Note: lineItems are calculated and fetched from FTW backend
          // so we need to pass only booking data that is needed otherwise
          // If you have added new fields to the form that will affect to pricing,
          // you need to add the values to handleOnChange function
          const bookingData =
            values && values.bookingDate && values.bookingDate.date
              ? {
                  unitType,
                  startDate: values.bookingDate.date,
                  endDate: values.bookingDate.date,
                }
              : null;

          const showEstimatedBreakdown =
            lineItems && !fetchLineItemsInProgress && !fetchLineItemsError;

          const bookingInfoMaybe = showEstimatedBreakdown ? (
            <div className={css.priceBreakdownContainer}>
              <h3 className={css.priceBreakdownTitle}>
                <FormattedMessage id="BookingDatesForm.priceBreakdownTitle" />
              </h3>
              <EstimatedBreakdownMaybe bookingData={bookingData} lineItems={lineItems} />
            </div>
          ) : null;

          const loadingSpinnerMaybe = fetchLineItemsInProgress ? (
            <IconSpinner className={css.spinner} />
          ) : null;

          const bookingInfoErrorMaybe = fetchLineItemsError ? (
            <span className={css.sideBarError}>
              <FormattedMessage id="BookingDatesForm.fetchLineItemsError" />
            </span>
          ) : null;

          // const now = moment();
          // const today = now.startOf('day').toDate();
          // const tomorrow = now
          //   .startOf('day')
          //   .add(1, 'days')
          //   .toDate();
          const submitButtonClasses = classNames(
            submitButtonWrapperClassName || css.submitButtonWrapper
          );

          return (
            <Form onSubmit={handleSubmit} className={classes}>
              {timeSlotsError}
              <FormSpy
                subscription={{ values: true }}
                onChange={values => {
                  this.handleOnChange(values);
                }}
              />
              <FieldSelect id="people" name="people" className={css.field}>
                <option disabled value="">
                  How many people?
                </option>

                {optionsKey.map(key => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </FieldSelect>

              <br />
              <FieldDateInput
                id={formId ? `${formId}.bookingDate` : 'bookingDate'}
                label="When are you going?"
                placeholderText="Select a date"
                name="bookingDate"
              />
              {bookingInfoMaybe}
              {loadingSpinnerMaybe}
              {bookingInfoErrorMaybe}
              <p className={css.smallPrint}>
                <FormattedMessage
                  id={
                    isOwnListing
                      ? 'BookingDatesForm.ownListing'
                      : 'BookingDatesForm.youWontBeChargedInfo'
                  }
                />
              </p>
              <div className={submitButtonClasses}>
                <PrimaryButton type="submit">
                  <FormattedMessage id="BookingDatesForm.requestToBook" />
                </PrimaryButton>
              </div>
            </Form>
          );
        }}
      />
    );
  }
}

BookingDatesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  submitButtonWrapperClassName: null,
  price: null,
  isOwnListing: false,
  startDatePlaceholder: null,
  endDatePlaceholder: null,
  timeSlots: null,
  lineItems: null,
  fetchLineItemsError: null,
};

BookingDatesFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  submitButtonWrapperClassName: string,

  unitType: propTypes.bookingUnitType.isRequired,
  price: propTypes.money,
  isOwnListing: bool,
  timeSlots: arrayOf(propTypes.timeSlot),

  onFetchTransactionLineItems: func.isRequired,
  lineItems: array,
  fetchLineItemsInProgress: bool.isRequired,
  fetchLineItemsError: propTypes.error,

  // from injectIntl
  intl: intlShape.isRequired,

  // for tests
  startDatePlaceholder: string,
  endDatePlaceholder: string,
};

const BookingDatesForm = compose(injectIntl)(BookingDatesFormComponent);
BookingDatesForm.displayName = 'BookingDatesForm';

export default BookingDatesForm;
