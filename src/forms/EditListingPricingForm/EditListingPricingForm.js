import React, { useEffect, useState } from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import config from '../../config';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import { Button, Form, FieldCurrencyInput, FieldTextInput } from '../../components';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';

import css from './EditListingPricingForm.module.css';

const { Money } = sdkTypes;
function ordinal_suffix_of(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + 'st';
  }
  if (j == 2 && k != 12) {
    return i + 'nd';
  }
  if (j == 3 && k != 13) {
    return i + 'rd';
  }
  return i + 'th';
}

export const EditListingPricingFormComponent = props => {
  return (
    <FinalForm
      {...props}
      mutators={{ ...arrayMutators }}
      render={formRenderProps => {
        const {
          className,
          disabled,
          ready,
          handleSubmit,
          intl,
          invalid,
          pristine,
          saveActionMsg,
          updated,
          updateInProgress,
          fetchErrors,
          values,
          onChange,
        } = formRenderProps;

        const unitType = config.bookingUnitType;
        const isNightly = unitType === LINE_ITEM_NIGHT;
        const isDaily = unitType === LINE_ITEM_DAY;
        // const { pricing } = props.initialValues;

        const translationKey = isNightly
          ? 'EditListingPricingForm.pricePerNight'
          : isDaily
          ? 'EditListingPricingForm.pricePerDay'
          : 'EditListingPricingForm.pricePerUnit';

        const pricePerUnitMessage = intl.formatMessage({
          id: translationKey,
        });

        const pricePlaceholderMessage = intl.formatMessage({
          id: 'EditListingPricingForm.priceInputPlaceholder',
        });

        const priceRequired = validators.required(
          intl.formatMessage({
            id: 'EditListingPricingForm.priceRequired',
          })
        );
        const minPrice = new Money(config.listingMinimumPriceSubUnits, config.currency);
        const minPriceRequired = validators.moneySubUnitAmountAtLeast(
          intl.formatMessage(
            {
              id: 'EditListingPricingForm.priceTooLow',
            },
            {
              minPrice: formatMoney(intl, minPrice),
            }
          ),
          config.listingMinimumPriceSubUnits
        );
        const priceValidators = config.listingMinimumPriceSubUnits
          ? validators.composeValidators(priceRequired, minPriceRequired)
          : priceRequired;

        const classes = classNames(css.root, className);
        const submitReady = (updated && pristine) || ready;
        const submitInProgress = updateInProgress;
        const submitDisabled = invalid || disabled || submitInProgress;
        const { updateListingError, showListingsError } = fetchErrors || {};
        const required = validators.required('This field is required');
        console.log('these props', props);

        return (
          <Form onSubmit={handleSubmit} className={classes}>
            {updateListingError ? (
              <p className={css.error}>
                <FormattedMessage id="EditListingPricingForm.updateFailed" />
              </p>
            ) : null}
            {showListingsError ? (
              <p className={css.error}>
                <FormattedMessage id="EditListingPricingForm.showListingFailed" />
              </p>
            ) : null}

            <section className={css.section}>
              <header className={css.sectionHeader}>
                <h2 className={css.sectionTitle}>Max amount of people</h2>
              </header>

              <FieldTextInput
                type="number"
                name={`maxPeople`}
                id="maxPeople"
                label="Total number of people allowed per trip"
                validate={required}
                onChange={onChange}
              />
            </section>

            <section className={css.section}>
              <header className={css.sectionHeader}>
                <h2 className={css.sectionTitle}>Cost per person</h2>
              </header>

              <FieldArray id={`pricing`} name={`pricing`}>
                {({ fields }) => {
                  return fields.map((field, index) => {
                    const label = `${ordinal_suffix_of(index + 1)} person`;

                    return (
                      <>
                        <FieldCurrencyInput
                          id={`${field}`}
                          name={`${field}`}
                          className={css.priceInput}
                          label={label}
                          placeholder={pricePlaceholderMessage}
                          currencyConfig={config.currencyConfig}
                          validate={priceValidators}
                          key={index}
                        />
                        <br />
                      </>
                    );
                  });
                }}
              </FieldArray>
            </section>
            <br />
            <Button
              className={css.submitButton}
              type="submit"
              inProgress={submitInProgress}
              // disabled={submitDisabled}
              ready={submitReady}
            >
              {saveActionMsg}
            </Button>
          </Form>
        );
      }}
    />
  );
};

EditListingPricingFormComponent.defaultProps = { fetchErrors: null };

EditListingPricingFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

export default compose(injectIntl)(EditListingPricingFormComponent);
