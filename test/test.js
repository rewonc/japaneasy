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
  var test = function(params){
    return new Dictionary(params);
  }

  it("returns a function for valid dict entries", function(){
    expect(test({dictionary: "edict"})).to.be.a('function');
    expect(test({dictionary: "enamdict"})).to.be.a('function');
    expect(test({dictionary: "computing"})).to.be.a('function');
    expect(test({dictionary: "life-science"})).to.be.a('function');
    expect(test({dictionary: "legal"})).to.be.a('function');
    expect(test({dictionary: "finance"})).to.be.a('function');
    expect(test({dictionary: "buddhism"})).to.be.a('function');
    expect(test({dictionary: "glossing"})).to.be.a('function');
    expect(test({dictionary: "german"})).to.be.a('function');
    expect(test({dictionary: "french"})).to.be.a('function');
    expect(test({dictionary: "dutch"})).to.be.a('function');
  });

  it("throws an error when initialized with invalid parameters for dictionary", function(){
    expect(function(){test({dictionary: "blah"})}).to.throw('Invalid parameter for dictionary');
    expect(function(){test({dictionary: "english"})}).to.throw('Invalid parameter for dictionary');
    expect(function(){test({dictionary: "japanese"})}).to.throw('Invalid parameter for dictionary');
    expect(function(){test({dictionary: ""})}).to.not.throw('Invalid parameter for dictionary');
    expect(function(){test({dictionary: "blah"})}).to.throw('Invalid parameter for dictionary');
    expect(function(){test({dictionary: {hello: "world"}})}).to.throw('Dictionary input must be a string');
    expect(function(){test({dictionary: 123})}).to.throw('Dictionary input must be a string');
  });

  it("returns a function for valid params for method", function(){
    expect(test({method: "kanji"})).to.be.a('function');
    expect(test({method: "glossing"})).to.be.a('function');
    expect(test({method: "word"})).to.be.a('function');
  });
  
  it("throws an error for invalid params for method", function(){  
    expect(function(){test({method: "blah"})}).to.throw('Invalid parameter for method');
    expect(function(){test({method: "etc"})}).to.throw('Invalid parameter for method');
    expect(function(){test({method: 123})}).to.throw('Method input must be a string');
  });

  it("returns a function for valid params for encoding", function(){
    expect(test({encoding: "UTF-8"})).to.be.a('function');
    expect(test({encoding: "Shift-JIS"})).to.be.a('function');
    expect(test({encoding: "EUC"})).to.be.a('function');
    expect(test({encoding: "ISO-2022-JP"})).to.be.a('function');
    expect(test({encoding: "UCS"})).to.be.a('function');
  });
  
  it("throws an error for invalid params for encoding", function(){  
    expect(function(){test({encoding: "blah"})}).to.throw('Invalid parameter for encoding');
    expect(function(){test({encoding: "etc"})}).to.throw('Invalid parameter for encoding');
    expect(function(){test({encoding: 123})}).to.throw('Encoding input must be a string');
  });

  it("returns a function for custom string inputs that are long enough", function(){
    expect(test({custom: "ab2i"})).to.be.a('function');
    expect(test({custom: "conni"})).to.be.a('function');
    expect(test({custom: "balhh"})).to.be.a('function');
  }); 

  it("throws an error for nonstring custom inputs", function(){
    expect(function(){test({custom: 123})}).to.throw('Custom input must be a string');
    expect(function(){test({custom: "a"})}).to.throw('Custom input must be at least 4 characters long');
  });  
  
});

describe('Limits on querying', function() {
  it("throws an exception to blank string", function(){
    var a = new Dictionary();
    expect(function(){a('')}).to.throw('cannot be blank');
  });
  it("throws an exception to null, undefined, or no input", function(){
    var a = new Dictionary();
    expect(function(){a()}).to.throw('must provide input that is not null or undefined');
    expect(function(){a(null)}).to.throw('must provide input that is not null or undefined');
    expect(function(){a(undefined)}).to.throw('must provide input that is not null or undefined');
  });
  it("throws an exception to non string types", function(){
    var a = new Dictionary();
    expect(function(){a({hello: "world"})}).to.throw('must be a string');
    expect(function(){a(12345.10)}).to.throw('must be a string');
    expect(function(){a(["abc","def"])}).to.throw('must be a string');
  })
});

//TODO: stub out url tests -- spy and make sure the url is correct


//TODO: stub out using nock or rewire~~make sure the response is parsed correctly


//TODO: test for mirrors and switching of them




