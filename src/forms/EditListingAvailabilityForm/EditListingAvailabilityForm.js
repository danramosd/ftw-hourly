import React, { Component } from 'react';
import { bool, func, object, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { Form, Button } from '../../components';
import { FieldCheckbox, FieldCheckboxGroup } from '../../components';
import ManageAvailabilityCalendar from './ManageAvailabilityCalendar';
import arrayMutators from 'final-form-arrays';
import css from './EditListingAvailabilityForm.module.css';

const WEEKDAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
export class EditListingAvailabilityFormComponent extends Component {
  render() {
    console.log('initialValues', this.initialValues);

    return (
      <FinalForm
        {...this.props}
        mutators={{ ...arrayMutators }}
        render={formRenderProps => {
          const {
            className,
            rootClassName,
            disabled,
            ready,
            handleSubmit,
            //intl,
            invalid,
            pristine,
            saveActionMsg,
            updated,
            updateError,
            updateInProgress,
            availability,
            availabilityPlan,
            listingId,
          } = formRenderProps;

          const errorMessage = updateError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingAvailabilityForm.updateFailed" />
            </p>
          ) : null;

          const classes = classNames(rootClassName || css.root, className);
          const submitReady = (updated && pristine) || ready;
          const submitInProgress = updateInProgress;
          const submitDisabled = invalid || disabled || submitInProgress;
          const options = WEEKDAYS.map(day => ({ key: day, label: day }));
          return (
            <Form className={classes} onSubmit={handleSubmit}>
              {errorMessage}
              <div className={css.calendarWrapper}>
                <FieldCheckboxGroup
                  className={css.features}
                  id="availability"
                  name="availability"
                  options={options}
                />

                {/* <ManageAvailabilityCalendar
                  availability={availability}
                  availabilityPlan={availabilityPlan}
                  listingId={listingId}
                /> */}
              </div>

              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
                ready={submitReady}
              >
                {saveActionMsg}
              </Button>
            </Form>
          );
        }}
      />
    );
  }
}

EditListingAvailabilityFormComponent.defaultProps = {
  updateError: null,
};

EditListingAvailabilityFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,
  availability: object.isRequired,
  availabilityPlan: propTypes.availabilityPlan.isRequired,
};

export default compose(injectIntl)(EditListingAvailabilityFormComponent);
