/**
 * collection-sync
 * Collection sync model
 *
 * @copyright 2012 Enrico Marino and Federico Spini
 * @license MIT
 */ 

/**
 * Dependencies
 */

var request = require('request');
var Collection = require('collection');

/**
 * Expose `CollectionSync`
 */

module.exports = CollectionSync;

/**
 * CollectionSync
 * 
 * @param {Object} options options
 * @api public
 */

function CollectionSync (options) {
  options = options || {};
  this.root = options.root || ''; 
}

/**
 * Inherit from `Collection`
 */

CollectionSync.prototype = Object.create(Collection.prototype);
CollectionSync.prototype.constructor = CollectionSync;
