const { APIKEY } = require('../config/config');

module.exports.helper = function helper(headers) {
  const modified = headers;
  modified.Authorization = APIKEY;
  modified.host = 'app-hrsei-api.herokuapp.com';
  return modified;
};
