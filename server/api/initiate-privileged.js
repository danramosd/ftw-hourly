const { transactionLineItems } = require('../api-util/lineItems');
const { getSdk, getTrustedSdk, handleError, serialize } = require('../api-util/sdk');

module.exports = (req, res) => {
  const { isSpeculative, bookingData, bodyParams, queryParams } = req.body;

  const listingId = bodyParams && bodyParams.params ? bodyParams.params.listingId : null;

  const sdk = getSdk(req, res);
  let lineItems = null;

  sdk.listings
    .show({ id: listingId })
    .then(listingResponse => {
      const listing = listingResponse.data.data;
      lineItems = transactionLineItems(listing, bookingData);
      return getTrustedSdk(req);
    })
    .then(trustedSdk => {
      const { params } = bodyParams;
      console.log(' got params', params);
      const bookingStart = new Date(params.bookingEnd);
      const bookingEnd = new Date(params.bookingStart);
      // Add lineItems to the body params
      const body = {
        ...bodyParams,
        params: {
          ...params,
          lineItems,
          bookingStart: new Date('2021-01-11T00:00:00.000Z'),
          bookingEnd: new Date('2021-01-12T00:08:00.000Z'),
        },
      };
      console.log('body', body, trustedSdk.transactions.initiateSpeculative);

      if (isSpeculative) {
        return trustedSdk.transactions.initiateSpeculative(body, queryParams);
      }
      return trustedSdk.transactions.initiate(body, queryParams);
    })
    .then(apiResponse => {
      const { status, statusText, data } = apiResponse;
      console.log('api response', status, statusText, data);

      res
        .status(status)
        .set('Content-Type', 'application/transit+json')
        .send(
          serialize({
            status,
            statusText,
            data,
          })
        )
        .end();
    })
    .catch(e => {
      handleError(res, e);
    });
};
