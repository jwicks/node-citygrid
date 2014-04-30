/*!
 * CityGrid API Wrapper
 */

/**
 * Module dependencies.
 */
var request = require('request')
  , url = require('url')
  , util = require('util');


var API_ENDPOINTS = {
  placesSearch:        'http://api.citygridmedia.com/content/places/v2/search/where',
  placesSearchLatLon:  'http://api.citygridmedia.com/content/places/v2/search/latlon',
  placesDetail:        'http://api.citygridmedia.com/content/places/v2/detail',
  offersSearch:        'http://api.citygridmedia.com/content/offers/v2/search/where',
  offersSearchLatLon:  'http://api.citygridmedia.com/content/offers/v2/search/latlon',
  offersDetail:        'http://api.citygridmedia.com/content/offers/v2/detail',
  reviewsSearch:       'http://api.citygridmedia.com/content/reviews/v2/search/where',
  reviewsSearchLatLon: 'http://api.citygridmedia.com/content/reviews/v2/search/latlon'
};


/**
 * CityGrid API Wrapper
 *
 * @param  {String}  publisher  The CityGrid publisher code.
 */
function CityGrid(publisher) {
  this.options = {
    publisher: publisher,
    format: 'json'
  };

  // Add functions for each endpoint
  for (var endpoint in API_ENDPOINTS) {
    CityGrid.prototype[endpoint] = createEndpoint(endpoint);
  }

  function createEndpoint(endpoint) {
    return function (options, callback) {
      CityGrid.prototype._get.call(this, endpoint, options, callback);
    };
  }
}


/**
 * Creates and calls the GET request
 *
 * @param  {String}  endpoint  The API url on CityGrid.
 * @param  {String}  parameters  Request parameters.
 * @param  {Function}  callback  Callback function.
 */
CityGrid.prototype._get = function (endpoint, parameters, callback) {
  parameters = util._extend(parameters, this.options); // Add credentials to parameters

  // Build the URL
  var urlObj = url.parse(API_ENDPOINTS[endpoint]);
  urlObj.query = parameters;
  var urlFormatted = url.format(urlObj);

  request({
    method : 'GET',
    url: urlFormatted
  }, function (err, response, body) {
    if (err) {
      return callback(util.format('CityGrid API Error: %s, API URL: %s', err, urlFormatted));
    }
    var json;
    try {
      json = JSON.parse(body);
    } catch (e) {
      return callback(util.format('CityGrid API Response Parse Error: %s, API URL: %s', e, urlFormatted));
    }
    if (response && response.statusCode !== 200) {
      return callback(util.format('CityGrid API Response Errors: %s, Status: %s, API URL: %s', 
        JSON.stringify(json.errors), response.statusCode, urlFormatted));
    }

    callback(null, json);
  });
};

module.exports = exports = CityGrid;
