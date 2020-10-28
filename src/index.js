const FourtwentyQuery = require('fourtwozerojs-query');
const FourtwentyFilter = require('fourtwozerojs-filter');
const FourtwentyContract = require('fourtwozerojs-contract');
const HttpProvider = require('fourtwozerojs-provider-http');
const abi = require('fourtwozerojs-abi');
// const getTxSuccess = require('fourtwozerojs-transaction-success'); // eslint-disable-line
const unit = require('fourtwozerojs-unit');
const keccak256 = require('js-sha3').keccak_256;
const toBN = require('number-to-bn');
const BN = require('bn.js');
const utils = require('fourtwozerojs-util');
const getTransactionSuccess = require('./lib/getTransactionSuccess.js');

module.exports = Fourtwenty;

/**
 * Returns the fourtwozerojs Fourtwenty instance.
 *
 * @method Fourtwenty
 * @param {Object} cprovider the web3 standard provider object
 * @param {Object} options the Fourtwenty options object
 * @returns {Object} fourtwenty Fourtwenty object instance
 * @throws if the new flag is not used in construction
 */

function Fourtwenty(cprovider, options) {
  if (!(this instanceof Fourtwenty)) { throw new Error('[fourtwozerojs] the Fourtwenty object requires you construct it with the "new" flag (i.e. `const fourtwenty = new Fourtwenty(...);`).'); }
  const self = this;
  self.options = options || {};
  const query = new FourtwentyQuery(cprovider, self.options.query);
  Object.keys(Object.getPrototypeOf(query)).forEach((methodName) => {
    self[methodName] = (...args) => query[methodName].apply(query, args);
  });
  self.filter = new FourtwentyFilter(query, self.options.query);
  self.contract = new FourtwentyContract(query, self.options.query);
  self.currentProvider = query.rpc.currentProvider;
  self.setProvider = query.setProvider;
  self.getTransactionSuccess = getTransactionSuccess(self);
}

Fourtwenty.BN = BN;
Fourtwenty.isAddress = (val) => utils.isHexString(val, 20);
Fourtwenty.keccak256 = (val) => `0x${keccak256(val)}`;
Fourtwenty.Buffer = Buffer;
Fourtwenty.isHexString = utils.isHexString;
Fourtwenty.fromMarley = unit.fromMarley;
Fourtwenty.toMarley = unit.toMarley;
Fourtwenty.toBN = toBN;
Fourtwenty.abi = abi;
Fourtwenty.fromAscii = utils.fromAscii;
Fourtwenty.toAscii = utils.toAscii;
Fourtwenty.fromUtf8 = utils.fromUtf8;
Fourtwenty.toUtf8 = utils.toUtf8;
Fourtwenty.HttpProvider = HttpProvider;
