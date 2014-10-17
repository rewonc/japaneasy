var expect = require('chai').expect;
var sinon = require('sinon');
var Dictionary = require('..');

//common word search + specific input types. All return same output type? Seem to... Just an array.
//there are: dictionary lookups, kanji lookups, text glossing, (throw out rest for now)
//just do ordinary jpn/en, common words, and text glossing for now. 

describe("Initialization", function(){

  it("is a function when initialized with no inputs", function(){
    var a = new Dictionary();
    expect(a).is.a("function");
  });
  it("is a function when initialized with blank object", function(){
    var a = new Dictionary({});
    expect(a).is.a("function");
  });
  
  //TODO: test for valid configuration options

});

describe('Limits on querying', function() {
  it("throws an exception to blank string", function(){
    var a = new Dictionary();
    expect(a('')).to.throw('blank input');
  });
  it("throws an exception to null, undefined, or no input", function(){
    var a = new Dictionary();
    expect(a()).to.throw('must provide input that is not null or undefined');
    expect(a(null)).to.throw('must provide input that is not null or undefined');
    expect(a(undefined)).to.throw('must provide input that is not null or undefined');
  });
  it("throws an exception to non string types", function(){
    var a = new Dictionary();
    expect(a({hello: "world"})).to.throw('must be a string');
    expect(a(12345.10)).to.throw('must be a string');
    expect(a(["abc","def"])).to.throw('must be a string');
  })
});

//TODO: test for valid queries & expected responses, one for each section


//TODO: test for mirrors and switching of them




