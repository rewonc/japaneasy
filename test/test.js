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

  it("returns a function for valid mirror locations", function(){
    expect(test({mirror: "austrailia"})).to.be.a('function');
    expect(test({mirror: "canada"})).to.be.a('function');
    expect(test({mirror: "germany"})).to.be.a('function');
    expect(test({mirror: "japan"})).to.be.a('function');
    expect(test({mirror: "sweden"})).to.be.a('function');
    expect(test({mirror: "usa"})).to.be.a('function');
  });

  it("throws an error for invalid mirror inputs", function(){
    expect(function(){test({mirror: 123})}).to.throw('Default mirror input must be a string');
    expect(function(){test({mirror: "a"})}).to.throw('Invalid mirror name');
  });  

  it("throws an error for nonpositive noninteger timeout values", function(){
    expect(function(){test({timeout: -10})}).to.throw('timeout must be a positive integer');
    expect(function(){test({timeout: "100"})}).to.throw('timeout must be a positive integer');
  }); 
  
});

describe('Url generator', function(){
  var url = require('../lib/url');
  it("should generate a default url without any configuration", function(){
    expect( url() ).to.equal('http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?1ZUP');
    expect( url({}) ).to.equal('http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?1ZUP');
    expect( url({dictionary: '', method: '', encode: '', custom: '', mirror: '', timeout: 200}) )
      .to.equal('http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?1ZUP');
  });

  it("should generate a url for basic japanese lookup", function(){
    expect( url({input: "japanese"}) ).to.equal('http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?1ZUJ');
  });

  it("should generate a url for basic english lookup", function(){
    expect( url({input: "english"}) ).to.equal('http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?1ZUE');
  });

  it("should generate a url for different dictionaries", function(){
    expect( url({dictionary: "edict"}) ).to.equal('http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?1ZUP');
    expect( url({dictionary: "enamdict"}) ).to.equal('http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?2ZUP');
    expect( url({dictionary: "computing"}) ).to.equal('http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?3ZUP');
    expect( url({dictionary: "sci-eng"}) ).to.equal('http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?AZUP');
    expect( url({dictionary: "german"}) ).to.equal('http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?GZUP');
    expect( url({dictionary: "glossing"}) ).to.equal('http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?9ZIP');
  });

  it("should generate a url for different search methods", function(){
    expect( url({dictionary: "edict", method: "word"}) ).to.equal('http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?1ZUP');
    expect( url({dictionary: "edict", method: "glossing"}) ).to.equal('http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?9ZIP');
    expect( url({dictionary: "edict", method: "kanji"}) ).to.equal('http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?1ZMP');

  });

  it("should generate a url for different encoding types", function(){
    expect( url({dictionary: "edict", encoding: "UTF-8"}) ).to.equal('http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?1ZUP');
    expect( url({dictionary: "edict", encoding: "Shift-JIS"}) ).to.equal('http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?1ZSP');
    expect( url({dictionary: "edict", encoding: "ASCII"}) ).to.equal('http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?1ZDP');
    expect( url({dictionary: "glossing", encoding: "UTF-8"}) ).to.equal('http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?9ZIP');
    expect( url({dictionary: "glossing", encoding: "Shift-JIS"}) ).to.equal('http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?9ZHP');
    expect( url({dictionary: "glossing", encoding: "UCS"}) ).to.equal('http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?9ZGP');
  });

  it("should have a no-repeat option for glossing", function(){
    expect( url({dictionary: "glossing", noRepeat: true}) ).to.equal('http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?9ZIG');
  });

  it("should accurately switch between mirrors", function(){
    expect( url({mirror: "usa"}) ).to.equal('http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?1ZUP');
    expect( url({mirror: "sweden"}) ).to.equal('http://wwwjdic.se/cgi-bin/wwwjdic?1ZUP');
    expect( url({mirror: "canada"}) ).to.equal('http://www.ottix.net/cgi-bin/wwwjdic/wwwjdic?1ZUP');
    expect( url({mirror: "germany"}) ).to.equal('http://wwwjdic.biz/cgi-bin/wwwjdic?1ZUP');
    expect( url({mirror: "japan"}) ).to.equal('http://gengo.com/wwwjdic/cgi-data/wwwjdic?1ZUP');
    expect( url({mirror: "austrailia"}) ).to.equal('http://www.csse.monash.edu.au/~jwb/cgi-bin/wwwjdic?1ZUP');
  });

  it("should overwrite other settings when a custom input is entered", function(){
    expect( url({dictionary: "glossing", custom: "abcdef"}) ).to.equal('http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?abcdef');
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


//TODO: stub out using nock or rewire~~make sure the response is parsed correctly


//TODO: test for mirrors and switching of them




