import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '../../components';
import { EditListingPricingForm } from '../../forms';
import { ensureOwnListing } from '../../util/data';
import { types as sdkTypes } from '../../util/sdkLoader';
import get from 'lodash/get';
import config from '../../config';

import css from './EditListingPricingPanel.module.css';

const { Money } = sdkTypes;

let pricingOverwritten = false;
const EditListingPricingPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    disabled,
    ready,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    onAddAvailabilityException,
    errors,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { price, publicData } = currentListing.attributes;
  const { maxPeople = 2 } = publicData;
  const [localMaxPeople, setMaxPeople] = useState(maxPeople);
  let { pricing = [] } = publicData;
  pricing = pricing.map(({ price }) => {
    return new Money(price.amount, price.currency);
  });

  useEffect(() => {
    return () => {
      pricingOverwritten = false;
    };
  }, []);

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingPricingPanel.title"
      values={{
        listingTitle: (
          <ListingLink listing={listing}>
            <FormattedMessage id="EditListingPricingPanel.listingTitle" />
          </ListingLink>
        ),
      }}
    />
  ) : (
    <FormattedMessage id="EditListingPricingPanel.createListingTitle" />
  );

  const handleOnChange = event => {
    setMaxPeople(Number(event.target.value));
    pricingOverwritten = true;
    onChange(event);
  };
  const priceCurrencyValid = price instanceof Money ? price.currency === config.currency : true;
  const form = priceCurrencyValid ? (
    <EditListingPricingForm
      className={css.form}
      initialValues={{
        maxPeople: localMaxPeople,
        pricing:
          pricing.length && !pricingOverwritten
            ? pricing
            : Array(localMaxPeople).fill(new Money(10000, 'USD')),
      }}
      onSubmit={values => {
        const { maxPeople, pricing } = values;
        const updatedValues = {
          price: {
            currency: pricing[0].currency,
            amount: pricing[0].amount,
          },
          publicData: {
            maxPeople: Number(maxPeople),
            pricing: pricing.map((price, people) => {
              const { currency, amount } = price;
              return {
                price: { currency, amount },
                people: people + 1,
              };
            }),
          },
        };
        onSubmit(updatedValues);
      }}
      onChange={handleOnChange}
      saveActionMsg={submitButtonText}
      disabled={disabled}
      ready={ready}
      updated={panelUpdated}
      updateInProgress={updateInProgress}
      fetchErrors={errors}
    />
  ) : (
    <div className={css.priceCurrencyInvalid}>
      <FormattedMessage id="EditListingPricingPanel.listingPriceCurrencyInvalid" />
    </div>
  );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      {form}
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingPricingPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingPricingPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  onAddAvailabilityException: func.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingPricingPanel;
