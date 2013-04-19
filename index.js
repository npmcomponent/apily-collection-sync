/**
 * collection-sync
 * Collection sync model
 *
 * @copyright 2012 Enrico Marino and Federico Spini
 * @license MIT
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
 * @constructor CoCollection
 *
 * @api public
 */

function CollectionSync (options) {
  Collection.call(this);
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
 * create
 *
 * @param {Function} callback
 *   @param {Object} err error
 *   @param {Model} model model
 * @param {Object} context
 * @api public
 */

CollectionSync.prototype.create = function (data, callback) {
  var callback = callback || function () {};
  var collection = this;
  var root = collection.root;
  var model;

  request
    .post(path)
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
 * @param {Function} callback
 *   @param {Object} err error
 *   @param {Object} res response
 * @param {Object} context
 * @api public
 */

CollectionSync.prototype.fetch = function (options, callback, context) {
  var options = options || {};
  var callback = callback || function () {};
  var collection = this;
  var models = [];
  var model;

  request
    .get(path)
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
