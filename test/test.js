var expect = require('chai').expect;
var Dictionary = require('..');
var parse = require('../lib/parse');
var url = require('../lib/url');


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
  it("should generate a default url without any configuration", function(){
    expect( url() ).to.equal('1ZUP');
    expect( url({}) ).to.equal('1ZUP');
    expect( url({dictionary: '', method: '', encode: '', custom: '', mirror: '', timeout: 200}) )
      .to.equal('1ZUP');
  });

  it("should generate a url for basic japanese lookup", function(){
    expect( url({input: "japanese"}) ).to.equal('1ZUJ');
  });

  it("should generate a url for basic english lookup", function(){
    expect( url({input: "english"}) ).to.equal('1ZUE');
  });

  it("should generate a url for different dictionaries", function(){
    expect( url({dictionary: "edict"}) ).to.equal('1ZUP');
    expect( url({dictionary: "enamdict"}) ).to.equal('2ZUP');
    expect( url({dictionary: "computing"}) ).to.equal('3ZUP');
    expect( url({dictionary: "sci-eng"}) ).to.equal('AZUP');
    expect( url({dictionary: "german"}) ).to.equal('GZUP');
    expect( url({dictionary: "glossing"}) ).to.equal('9ZIP');
  });

  it("should generate a url for different search methods", function(){
    expect( url({dictionary: "edict", method: "word"}) ).to.equal('1ZUP');
    expect( url({dictionary: "edict", method: "glossing"}) ).to.equal('9ZIP');
    expect( url({dictionary: "edict", method: "kanji"}) ).to.equal('1ZMP');

  });

  it("should generate a url for different encoding types", function(){
    expect( url({dictionary: "edict", encoding: "UTF-8"}) ).to.equal('1ZUP');
    expect( url({dictionary: "edict", encoding: "Shift-JIS"}) ).to.equal('1ZSP');
    expect( url({dictionary: "edict", encoding: "ASCII"}) ).to.equal('1ZDP');
    expect( url({dictionary: "glossing", encoding: "UTF-8"}) ).to.equal('9ZIP');
    expect( url({dictionary: "glossing", encoding: "Shift-JIS"}) ).to.equal('9ZHP');
    expect( url({dictionary: "glossing", encoding: "UCS"}) ).to.equal('9ZGP');
  });

  it("should have a no-repeat option for glossing", function(){
    expect( url({dictionary: "glossing", noRepeat: true}) ).to.equal('9ZIG');
  });

  //TODO: switch to integration test
  it("should accurately switch between mirrors", function(){
    expect( url({mirror: "usa"}) ).to.equal('1ZUP');
    expect( url({mirror: "sweden"}) ).to.equal('1ZUP');
    expect( url({mirror: "canada"}) ).to.equal('1ZUP');
    expect( url({mirror: "germany"}) ).to.equal('1ZUP');
    expect( url({mirror: "japan"}) ).to.equal('1ZUP');
    expect( url({mirror: "austrailia"}) ).to.equal('1ZUP');
  });

  it("should overwrite other settings when a custom input is entered", function(){
    expect( url({dictionary: "glossing", custom: "abcdef"}) ).to.equal('abcdef');
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


describe('Parsing responses', function(){
  it("accurately parses the response for 'hello'", function(){
    //hack for multiline string
    var testString = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">\n<HTML>\n<HEAD><META http-equiv="Content-Type" content="text/html; charset=UTF-8"><TITLE>WWWJDIC: Word Display</TITLE>\n</HEAD><BODY>\n<p>\n<pre>\nもしもし /(int) (1) hello (e.g. on phone)/(2) excuse me! (when calling out to someone)/(P)/\n今日は [こんにちは(P);こんちは] /(int) (uk) (こんちは is col.) hello/good day (daytime greeting)/(P)/\nどうも /(int) (1) (abbr) (See どうも有難う) thanks/(adv) (2) much (thanks)/very (sorry)/quite (regret)/(3) quite/really/mostly/(4) somehow/(5) (in positive sense, esp. どうも〜しまう) (See どうしても) in spite of oneself/no matter how hard one may try (one is unable to) (with negative verb)/no matter how hard one may try not to (one ends up doing) (with positive verb, esp. -shimau)/(int) (6) greetings/hello/goodbye/(P)/\nハロー(P);ハロ /(n) (1) halo/(2) (ハロー only) hello/hallo/hullo/(3) (ハロー only) harrow/(P)/\n</pre>\n</BODY>\n</HTML>\n';
    
    expect(parse(testString)).to.be.instanceOf(Array);
    expect(parse(testString)[0].japanese).to.equal("もしもし");

    expect(parse(testString)[0].english).to.be.instanceOf(Array);
    expect(parse(testString)[0].english[0]).to.equal("hello (e.g. on phone)");
  });

  it("accurately parses the response when no response exists'", function(){
    //hack for multiline string
    var testString = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">\n<HTML>\n<HEAD><META http-equiv="Content-Type" content="text/html; charset=UTF-8"><TITLE>WWWJDIC: Word Display</TITLE>\n</HEAD><BODY>\n<p>\nNo matches were found for this key!<p>\n</BODY>\n</HTML>\n';

    expect(parse(testString)).to.be.instanceOf(Array);
    expect(parse(testString)[0]).to.equal("No items were found; try another query.");

  });

  it("accurately parses the response for scientific search 'chemolithotroph', input english", function(){
    //hack for multiline string
    var testString = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">\n<HTML>\n<HEAD><META http-equiv="Content-Type" content="text/html; charset=UTF-8"><TITLE>WWWJDIC: Word Display</TITLE>\n</HEAD><BODY>\n<p>\n<pre>\n化学合成無機栄養生物 [かがくごうせいむきえいようせいぶつ] /(n) chemolithotroph/\n\n無機栄養細菌 [むきえいようさいきん] /(n) chemolithotroph/\n\n化学合成無機栄養グラム陰性細菌 [かがくごうせいむきえいようぐらむいんせいさいきん] /(np) Gram-negative chemolithotrophic bacteria/\n\n</pre>\n</BODY>\n</HTML>\n'

    expect(parse(testString)).to.be.instanceOf(Array);
    expect(parse(testString)[0].japanese).to.equal("化学合成無機栄養生物");
    expect(parse(testString)[0].pronunciation).to.equal("かがくごうせいむきえいようせいぶつ");
    expect(parse(testString)[0].english).to.be.instanceOf(Array);
    expect(parse(testString)[0].english[0]).to.equal("chemolithotroph");
  });

  it("accurately parses the response for glossing search '飛べねぇ豚はただのブタだ'", function(){
    //hack for multiline string
    var testString = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">\n<HTML>\n<HEAD><META http-equiv="Content-Type" content="text/html; charset=UTF-8"><TITLE>WWWJDIC: Text/word translation display</TITLE>\n</HEAD><BODY>\n<br>\n<font color="blue">飛べ</font>ねぇ<FONT color="red">豚</FONT>はただの<FONT color="red">ブタ</FONT>だ。<br>\n<ul><li> Possible inflected verb or adjective: (potential or imperative)<br>飛ぶ : 飛ぶ(P); 跳ぶ(P); 翔ぶ(oK) 【とぶ】 \t(v5b,vi) (1) (esp. 飛ぶ) to fly; to soar; (2) (esp. 跳ぶ) to jump; to leap; to spring; to bound; to hop; (P); ED </li>\n<li> 豚 : 豚(P); 豕 【ぶた(P); ブタ】 \t(n) (1) pig (Sus scrofa domesticus); (2) (derog) fat person; (P);  【とん】 ; (n-pref,n) pig; pork; ED </li>\n<li> ブタ : 豚(P); 豕 【ぶた(P); ブタ】 \t(n) (1) pig (Sus scrofa domesticus); (2) (derog) fat person; (P); ED </li>\n</ul><br>\n</BODY>\n</HTML>\n';

    expect(parse(testString)).to.be.instanceOf(Array);
    expect(parse(testString)[0].japanese).to.equal("飛ぶ");
    expect(parse(testString)[0].pronunciation).to.equal("とぶ");
    expect(parse(testString)[0].english).to.be.instanceOf(Array);
    expect(parse(testString)[0].english[0]).to.equal("(esp. 飛ぶ) to fly; to soar;");

    expect(parse(testString)[2].japanese).to.equal("ブタ");
    expect(parse(testString)[2].pronunciation).to.equal("ぶた(P); ブタ");
    expect(parse(testString)[2].english).to.be.instanceOf(Array);
    expect(parse(testString)[2].english[0]).to.equal("pig (Sus scrofa domesticus);");
  });

});


//TODO: stub out using nock or rewire~~make sure the response is parsed correctly


//TODO: test for mirrors and switching of them




