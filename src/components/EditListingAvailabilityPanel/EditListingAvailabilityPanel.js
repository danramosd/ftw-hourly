import React, { useState } from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '../../components';
import { EditListingAvailabilityForm } from '../../forms';
import { getDefaultTimeZoneOnBrowser, timestampToDate } from '../../util/dates';
import css from './EditListingAvailabilityPanel.module.css';
const defaultTimeZone = () =>
  typeof window !== 'undefined' ? getDefaultTimeZoneOnBrowser() : 'Etc/UTC';
///////////////////////////////////////////////////
// EditListingAvailabilityExceptionPanel  utils //
///////////////////////////////////////////////////

// Create initial entry mapping for form's initial values
const createEntryDayGroups = (entries = {}) =>
  entries.reduce((groupedEntries, entry) => {
    const { startTime, endTime: endHour, dayOfWeek } = entry;
    const dayGroup = groupedEntries[dayOfWeek] || [];
    return {
      ...groupedEntries,
      [dayOfWeek]: [
        ...dayGroup,
        {
          startTime,
          endTime: endHour === '00:00' ? '24:00' : endHour,
        },
      ],
    };
  }, {});
// Create availabilityPlan from submit values
const createAvailabilityPlan = values => ({
  availabilityPlan: {
    type: 'availability-plan/time',
    timezone: values.timezone,
    entries: createEntriesFromSubmitValues(values),
  },
});
const createEntriesFromSubmitValues = values =>
  WEEKDAYS.reduce((allEntries, dayOfWeek) => {
    const dayValues = values[dayOfWeek] || [];
    const dayEntries = dayValues.map(dayValue => {
      const { startTime, endTime } = dayValue;
      // Note: This template doesn't support seats yet.
      return startTime && endTime
        ? {
            dayOfWeek,
            seats: 1,
            startTime,
            endTime: endTime === '24:00' ? '00:00' : endTime,
          }
        : null;
    });

    return allEntries.concat(dayEntries.filter(e => !!e));
  }, []);

const EditListingAvailabilityPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    availability,
    disabled,
    ready,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  // const [valuesFromLastSubmit, setValuesFromLastSubmit] = useState(null);
  // const defaultAvailabilityPlan = {
  //   type: 'availability-plan/day',
  //   entries: [
  //     { dayOfWeek: 'mon', seats: 1 },
  //     { dayOfWeek: 'tue', seats: 1 },
  //     { dayOfWeek: 'wed', seats: 1 },
  //     { dayOfWeek: 'thu', seats: 1 },
  //     { dayOfWeek: 'fri', seats: 1 },
  //     { dayOfWeek: 'sat', seats: 1 },
  //     { dayOfWeek: 'sun', seats: 1 },
  //   ],
  // };
  // const createInitialValues = availabilityPlan => {
  //   const { timezone, entries } = availabilityPlan || {};
  //   const tz = timezone || defaultTimeZone();
  //   return {
  //     timezone: tz,
  //     ...createEntryDayGroups(entries),
  //   };
  // };
  // const availabilityPlan = currentListing.attributes.availabilityPlan || defaultAvailabilityPlan;
  // const initialValues = valuesFromLastSubmit
  //   ? valuesFromLastSubmit
  //   : createInitialValues(availabilityPlan);

  // const handleSubmit = values => {
  //   setValuesFromLastSubmit(values);

  //   // Final Form can wait for Promises to return.
  //   return onSubmit(values)
  //     .then(() => {
  //       setIsEditPlanModalOpen(false);
  //     })
  //     .catch(e => {
  //       // Don't close modal if there was an error
  //     });
  // };

  console.log('dan!', props);

  return (
    <div className={classes}>
      <h1 className={css.title}>
        {isPublished ? (
          <FormattedMessage
            id="EditListingAvailabilityPanel.title"
            values={{ listingTitle: <ListingLink listing={listing} /> }}
          />
        ) : (
          <FormattedMessage id="EditListingAvailabilityPanel.createListingTitle" />
        )}
      </h1>
      <EditListingAvailabilityForm
        className={css.form}
        listingId={currentListing.id}
        initialValues={{}}
        // availability={availability}
        // availabilityPlan={availabilityPlan}
        onSubmit={data => {
          const { availability } = data;
          // We save the default availability plan
          // I.e. this listing is available every night.
          // Exceptions are handled with live edit through a calendar,
          // which is visible on this panel.
          const entries = Object.values(availability).map(dayOfWeek => ({
            dayOfWeek,
            seats: 1,
          }));
          const formattedPlan = {
            type: 'availability-plan/day',
            entries,
          };
          onSubmit({ availabilityPlan: formattedPlan });
          // handleSubmit({ availabilityPlan });
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateError={errors.updateListingError}
        updateInProgress={updateInProgress}
      />
    </div>
  );
};

EditListingAvailabilityPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingAvailabilityPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  availability: shape({
    calendar: object.isRequired,
    onFetchAvailabilityExceptions: func.isRequired,
    onCreateAvailabilityException: func.isRequired,
    onDeleteAvailabilityException: func.isRequired,
  }).isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingAvailabilityPanel;
