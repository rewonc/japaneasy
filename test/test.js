// First, we require `expect` from Chai.
var expect = require('chai').expect;
var sinon = require('sinon');
var dictionary = require('..');

// `describe` makes a "suite" of tests; think of them as a group.
describe('Search function', function() {

  // The tests have an English description...
  it('returns hello, world', function() {
    // ...and a code assertion.
    expect(dictionary.search()).to.be.a('string');
    expect(dictionary.search()).to.equal('hello, world');
  });

  // You can have multiple tests in a suite.

});