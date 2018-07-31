/* eslint-disable max-len */

if (process.env.BROWSER) {
  throw new Error(
    'Do not import `config.js` from inside the client-side code.',
  );
}

module.exports = {
  // Node.js app
  port: process.env.PORT || 3000,

  // https://expressjs.com/en/guide/behind-proxies.html
  trustProxy:
    process.env.TRUST_PROXY !== 'true'
      ? process.env.TRUST_PROXY
      : true || 'loopback',

  // API Gateway
  api: {
    // API URL to be used in the fetch code
    url:
      process.env.API_SERVER_URL ||
      `http://localhost:${process.env.PORT || 3000}/api`, // when using a base url in conjunction with the /localapi make sure to prefix it in the url /base/localapi
  },

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },
};
