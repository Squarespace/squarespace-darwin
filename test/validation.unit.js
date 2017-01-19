/* eslint-env mocha */

const chai = require('chai');
const should = chai.should();

const { validateCallback } = require('../src/validation');

const calling = (fn, param) => {
  return fn.bind(null, param);
};

describe('validateCallback', function() {
  it('should return the callback if it\'s a function', function() {
    const fn = function() {};
    validateCallback(fn).should.equal(fn);
  });
  it('should throw error for non-function param', function() {
    calling(validateCallback, 'test string').should.throw(Error);
    calling(validateCallback, 123).should.throw(Error);
    calling(validateCallback, null).should.throw(Error);
    calling(validateCallback, undefined).should.throw(Error);
  });
});