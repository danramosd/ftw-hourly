const { transactionLineItems } = require('../api-util/lineItems');
const { getSdk, handleError, serialize } = require('../api-util/sdk');
const { constructValidLineItems } = require('../api-util/lineItemHelpers');

module.exports = (req, res) => {
  console.log('got data', req.body);

  const { isOwnListing, listingId, bookingData } = req.body;
  console.log('booking data', bookingData);

  const sdk = getSdk(req, res);

  const listingPromise = isOwnListing
    ? sdk.ownListings.show({ id: listingId })
    : sdk.listings.show({ id: listingId });

  listingPromise
    .then(apiResponse => {
      console.log('api response', apiResponse);

      const listing = apiResponse.data.data;
      const lineItems = transactionLineItems(listing, bookingData);

      // Because we are using returned lineItems directly in FTW we need to use the helper function
      // to add some attributes like lineTotal and reversal that Marketplace API also adds to the response.
      const validLineItems = constructValidLineItems(lineItems);

      res
        .status(200)
        .set('Content-Type', 'application/transit+json')
        .send(serialize({ data: validLineItems }))
        .end();
    })
    .catch(e => {
      handleError(res, e);
    });
};
