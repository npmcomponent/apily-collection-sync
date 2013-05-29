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
var ModelSync = require('model-sync');

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
 * model
 */

CollectionSync.prototype.model = ModelSync;

/**
 * root
 */

CollectionSync.prototype.root = '';

/**
 * path
 */
 
CollectionSync.prototype.path = '/';

/**
 * url
 * Get the model url.
 *
 * @return {String} the collection url.
 * @api public
 */

CollectionSync.prototype.url = function () {
  return this.root
    .concat('/')
    .concat(this.path)
    .replace(/\/\//, '/');
};

/**
 * get_by_id
 * 
 * @param {String} id id of the model to get
 * @return {Model} model
 * @api public
 */
 
CollectionSync.prototype.get_by_id = function (id) {
  var models = this.models;
  var len = models.length;
  var i;
  var model;
  
  for (i = 0; i < len; i += 1) {
    model = models[i];
    if (model.id() === id) {
      return model;      
    }
  }
  
  return;
}

CollectionSync.prototype.obtain = function (id, callback) {
 var model = this.get_by_id(id);
 
 if (!model) {
   model = new this.model();
   model.set(model.primary_key, id);
   this.add(model);
   model.fetch(callback);
   return;
 }
 
 callback(null, model);
}

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

CollectionSync.prototype.create = function (attributes, options, callback, context) {
  attributes = attributes || {};
  options = options || {};
  callback = callback || function () {};
  var collection = this;
  var url = collection.url();
  var data = attributes;

  request
    .post(url)
    .data(data)
    .end(function (res) {
      var models;

      if (res.ok) {
        models = collection.add(res.body, options);
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
        models = collection.add(res.body, options);
        callback.call(context, null, models);
      } else {
        callback.call(context, res.text, null);
      }
    });
};
