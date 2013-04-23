
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

function CollectionSync (models, options) {
  Collection.call(this, models, options);
  options = options || {};
  if (options.root) {
    this.root = options.root; 
  }
}

/**
 * Inherit from `Collection`
 */

CollectionSync.prototype = Object.create(Collection.prototype);
CollectionSync.prototype.constructor = CollectionSync;

/**
 * root
 */

CollectionSync.prototype.root = '';

/**
 * url
 * Get the model url.
 *
 * @return {String} the collection url.
 * @api public
 */

CollectionSync.prototype.url = function () {
  return this.root;
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
  var callback = callback || function () {};
  var url = this.url();
  var collection = this;
  var model;

  request
    .post(url)
    .data(data)
    .end(function (res) {
      if (res.ok) {
        model = collection.add(res.body);
        callback.call(context, null, model);
      } else {
        callback.call(context, res.text, null);
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
  var options = options || {};
  var callback = callback || function () {};
  var url = this.url();
  var collection = this;
  var models = [];
  var model;

  request
    .get(url)
    .end(function (res) {
      if (res.ok) {
        res.body.forEach(function (data) {
          model = collection.add(res.body);
          models.push(model);
        });
        callback.call(context, null, models);
      } else {
        callback.call(context, res.text, null);
      }
    });
};
