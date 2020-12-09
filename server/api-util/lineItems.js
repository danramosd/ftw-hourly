const { calculateQuantityFromHours, calculateTotalFromLineItems } = require('./lineItemHelpers');
const { types } = require('sharetribe-flex-sdk');
const { Money } = types;
const get = require('lodash/get');
// This bookingUnitType needs to be one of the following:
// line-item/night, line-item/day or line-item/units
const bookingUnitType = 'line-item/units';
const PROVIDER_COMMISSION_PERCENTAGE = -10;

const resolveCleaningFeePrice = listing => {
  const { publicData } = listing.attributes;
  console.log('publicData', publicData);

  return new Money(2000, 'USD');
  // const costPerPerson = publicData && publicData.pricing;
  // const { amount, currency } = cleaningFee;

  // if (amount && currency) {
  //   return new Money(amount, currency);
  // }

  // return null;
};

const resolveAdditionalPeople = (listing, people) => {
  const pricing = get(listing, 'attributes.publicData.pricing');
  if (pricing) {
    const priceMatch = pricing.find(price => price.people === people);
    console.log('priceMatch', priceMatch, pricing);

    return new Money(priceMatch.price, 'USD');
  }
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
  const { startDate, endDate, people } = bookingData;

  /**
   * If you want to use pre-defined component and translations for printing the lineItems base price for booking,
   * you should use code line-item/units
   *
   * Pre-definded commission components expects line item code to be one of the following:
   * 'line-item/provider-commission', 'line-item/customer-commission'
   *
   * By default BookingBreakdown prints line items inside LineItemUnknownItemsMaybe if the lineItem code is not recognized. */

  const booking = {
    code: bookingUnitType,
    unitPrice,
    quantity: calculateQuantityFromHours(startDate, endDate),
    includeFor: ['customer', 'provider'],
  };

  const cleaningFeePrice = resolveCleaningFeePrice(listing);
  const additionalPersonPrice = resolveAdditionalPeople(listing, people);
  const cleaningFee = cleaningFeePrice
    ? [
        {
          code: 'line-item/cleaning-fee',
          unitPrice: cleaningFeePrice,
          quantity: 1,
          includeFor: ['customer', 'provider'],
        },
      ]
    : [];

  const additionalPersonFee = additionalPersonPrice
    ? [
        {
          code: 'line-item/additional-person',
          unitPrice: additionalPersonPrice,
          quantity: 1,
          includeFor: ['customer', 'provider'],
        },
      ]
    : [];

  const providerCommission = {
    code: 'line-item/provider-commission',
    // unitPrice: calculateTotalFromLineItems([booking]),
    unitPrice: calculateTotalFromLineItems([booking, ...additionalPersonFee]),
    percentage: PROVIDER_COMMISSION_PERCENTAGE,
    includeFor: ['provider'],
  };

  // const lineItems = [booking, providerCommission];
  const lineItems = [booking, ...additionalPersonFee, providerCommission];

  return lineItems;
};
