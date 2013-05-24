/**!
 * collection-sync
 *
 * @author Enrico Marino and Federico Spini
 * @copyright 2013 Enrico Marino and Federico Spini
 * @licence MIT
 */

/** 
 * Component dependencies.
 */

var Collection = require('collection');
var request = require('request');

/**
 * Expose `CollectionSync`.
 */

module.exports = CollectionSync;

/**
 * @constructor CollectionSync
 *
 * @api public
 */

function CollectionSync (options) {
  Collection.call(this, options);
}

/**
 * Inherit from `Collection`
 */

CollectionSync.prototype = Object.create(Collection.prototype);
CollectionSync.prototype.constructor = CollectionSync;

/**
 * root
 */

CollectionSync.prototype.root = '/';

/**
 * path
 */
 
CollectionSync.prototype.path = '';

/**
 * url
 * Get the model url.
 *
 * @return {String} the collection url.
 * @api public
 */

CollectionSync.prototype.url = function () {
  var url = this.root;
  url += url.charAt(url.length - 1) === '/' ? '' : '/';
  url += path;
  
  return url;
};

/**
 * create
 *
 * @param {Object} data data
 * @param {Function} callback callback
 *   @param {Object} err error
 *   @param {Model} model model
 * @param {Object} context
 * @api public
 */

CollectionSync.prototype.create = function (data, callback, context) {
  data = data || {};
  callback = callback || function () {};
  var collection = this;
  var url = collection.url();

  request
    .post(url)
    .data(data)
    .end(function (res) {
      var models;

      if (res.ok) {
        models = collection.add(res.body);
        callback.call(context, null, models);
      } else {
        callback.call(context, res.body, null);
      }
    });
};

/**
 * fetch
 *
 * @param {Object} options options
 * @param {Function} callback callback
 *   @param {Object} err error
 *   @param {Object} res response
 * @param {Object} context
 * @api public
 */

CollectionSync.prototype.fetch = function (options, callback, context) {
  options = options || {};
  callback = callback || function () {};
  var query = options.query || {};
  var collection = this;
  var url = collection.url();
  
  request
    .get(url)
    .query(query)
    .end(function (res) {
      var models;
      
      if (res.ok) {
        models = collection.add(res.body);
        callback.call(context, null, models);
      } else {
        callback.call(context, res.text, null);
      }
    });
};
