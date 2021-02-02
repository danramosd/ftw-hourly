const { calculateQuantityFromHours, calculateTotalFromLineItems } = require('./lineItemHelpers');
const { types } = require('sharetribe-flex-sdk');
const { Money } = types;
const get = require('lodash/get');
// This bookingUnitType needs to be one of the following:
// line-item/night, line-item/day or line-item/units
const bookingUnitType = 'line-item/trip-price';
const PROVIDER_COMMISSION_PERCENTAGE = -7;

const resolvePersonCost = (pricing, people) => {
  if (!people) {
    return null;
  }

  const pricingRecords = pricing.filter(price => price.people <= people);
  const totalCost = pricingRecords.reduce((accum, currentValue) => {
    return currentValue.price.amount + accum.price.amount;
  });
  return new Money(totalCost, 'USD');
  return null;
};

/** Returns collection of lineItems (max 50)
 *
 * Each line items has following fields:
 * - `code`: string, mandatory, indentifies line item type (e.g. \"line-item/cleaning-fee\"), maximum length 64 characters.
 * - `unitPrice`: money, mandatory
 * - `lineTotal`: money
 * - `quantity`: number
 * - `percentage`: number (e.g. 15.5 for 15.5%)
 * - `seats`: number
 * - `units`: number
 * - `includeFor`: array containing strings \"customer\" or \"provider\", default [\":customer\"  \":provider\" ]
 *
 * Line item must have either `quantity` or `percentage` or both `seats` and `units`.
 *
 * `includeFor` defines commissions. Customer commission is added by defining `includeFor` array `["customer"]` and provider commission by `["provider"]`.
 *
 * @param {Object} listing
 * @param {Object} bookingData
 * @returns {Array} lineItems
 */

exports.transactionLineItems = (listing, bookingData) => {
  const unitPrice = listing.attributes.price;
  const { pricing } = listing.attributes.publicData;
  const { people } = bookingData;
  /**
   * If you want to use pre-defined component and translations for printing the lineItems base price for booking,
   * you should use code line-item/units
   *
   * Pre-definded commission components expects line item code to be one of the following:
   * 'line-item/provider-commission', 'line-item/customer-commission'
   *
   * By default BookingBreakdown prints line items inside LineItemUnknownItemsMaybe if the lineItem code is not recognized. */

  //  We don't use booking becuase everything is based upon the pricing attribute (since we can have mltiple people)
  // All of our "add ons" create the price, we have no base price
  // const booking = {
  //   code: bookingUnitType,
  //   unitPrice,
  //   quantity: 1,
  //   includeFor: ['customer', 'provider'],
  // };

  // const additionalPersonPrice = resolvePersonCost(pricing, people);

  // const additionalPersonFee = additionalPersonPrice
  //   ? [
  // {
  //   code: 'line-item/additional-people',
  //   unitPrice: additionalPersonPrice,
  //   quantity: people,
  //   includeFor: ['customer', 'provider'],
  // },
  //     ]
  //   : [];

  const personFees = pricing.filter(price => price.people <= people);

  const additionalPersonFee = personFees.map(lineItem => {
    return {
      code: `line-item/person-${lineItem.people}`,
      unitPrice: new Money(lineItem.price.amount, 'USD'),
      quantity: 1,
      includeFor: ['customer', 'provider'],
    };
  });

  const providerCommission = {
    code: 'line-item/provider-commission',
    unitPrice: calculateTotalFromLineItems([...additionalPersonFee]),
    percentage: PROVIDER_COMMISSION_PERCENTAGE,
    includeFor: ['provider'],
  };

  const lineItems = [providerCommission, ...additionalPersonFee];
  // const lineItems = [booking, ...additionalPersonFee, providerCommission];

  return lineItems;
};
