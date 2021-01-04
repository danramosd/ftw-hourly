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

import css from './EditListingPricingForm.module.css';

const { Money } = sdkTypes;

export const EditListingPricingFormComponent = props => {
  return (
    <FinalForm
      {...props}
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
                <h2 className={css.sectionTitle}>Trip rate</h2>
              </header>

              <FieldCurrencyInput
                id="price"
                name="price"
                className={css.priceInput}
                autoFocus
                label={pricePerUnitMessage}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
                validate={priceValidators}
              />
            </section>

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
              />
            </section>

            <section className={css.section}>
              <header className={css.sectionHeader}>
                <h2 className={css.sectionTitle}>Cost per person</h2>
              </header>

              <FieldCurrencyInput
                id="pricePerAdditionalPerson"
                name="pricePerAdditionalPerson"
                className={css.priceInput}
                label={'Enter the cost for each additional person'}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
                validate={priceValidators}
              />
            </section>

            <br />
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
