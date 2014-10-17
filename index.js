var dic = function(config){
  var dictionary, method, encoding, custom, mirror, timeout;
  
  //set config varaibles  TODO: DRY up, send to lib/init.js
  if (config && config.dictionary){
    if (typeof config.dictionary != "string") throw new Error("Dictionary input must be a string");
    if (!mapDictionary(config.dictionary)) throw new Error("Invalid parameter for dictionary")
    dictionary = mapDictionary(config.dictionary);
  }
  if (config && config.method){
    if (typeof config.method != "string") throw new Error("Method input must be a string");
    if (!mapMethod(config.method)) throw new Error("Invalid parameter for method")
    method = mapMethod(config.method);
  }
  if (config && config.encoding){
    if (typeof config.encoding != "string") throw new Error("Encoding input must be a string");
    if (!encode(config.encoding)) throw new Error("Invalid parameter for encoding");
  }
  if (config && config.custom){
    if (typeof config.custom != "string") throw new Error("Custom input must be a string");
    if (config.custom.length < 4) throw new Error("Custom input must be at least 4 characters long");
    custom = config.custom;
  }
  if (config && config.default_mirror){
    if (typeof config.default_mirror != "string") throw new Error("Default mirror input must be a string");
    if (!mapMirror(config.default_mirror)) throw new Error("Invalid mirror name");
    mirror = config.default_mirror;
  }
  if (config && config.encoding){
    if (typeof config.encoding != "string") throw new Error("Encoding input must be a string");
    if (!encode(config.encoding)) throw new Error("Invalid parameter for encoding");
  }
  if (config && config.timeout){
    if (typeof config.timeout != "number" || config.timeout < 0) throw new Error("timeout must be a positive integer");
    timeout = config.timeout;
  }
    

  return search;

  function search (text){
    if(text === "") {throw new Error("Input string cannot be blank")}
    if(text === null || text === undefined) {throw "You must provide input that is not null or undefined"}
    if(typeof text != "string") {throw "Input must be a string"}
    var url = generateUrl(text);
    return('hello, world');
  }

  function mapDictionary(key){
    var map = {
      "edict": "1",
      "enamdict": "2",
      "computing": "3",
      "life-science": "4",
      "legal": "5",
      "finance": "6",
      "buddhism": "7",
      "misc": "8",
      "glossing": "9",
      "sci-eng": "A",
      "linguistics": "B",
      "river-water": "C",
      "auto": "D",
      "jap-word-net": "E",
      "wip": "F",
      "german": "G",
      "french": "H",
      "russian": "I",
      "swedish": "J",
      "hungarian": "K",
      "spanish": "L",
      "dutch": "M",
      "slovenian": "N",
      "italian": "O",
      "untranslated": "P",
      "combined-jap-eng": "Q",
      "expanded-glossing": "R"
    }
    return map[key]
  }

  function mapMethod(key){
    var map = {
      "kanji": "M",
      "word": "U",
      "glossing": "I"
    }
    return map[key]
  }

  function encode(key){
    //this function has side effects
    if(key == "UTF-8") return true;
    if (key == "Shift-JIS") {
      //do something
      return true;
    } else if (key == "EUC" || key == "ISO-2022-JP" || key == "UCS"){
      //do something
      return true;
    } else{
      return false;
    }
  }

  function mapMirror(key){
    var map = {
      "austrailia": "http://www.csse.monash.edu.au/~jwb/cgi-bin/wwwjdic.cgi?",
      "canada": "http://www.ottix.net/cgi-bin/wwwjdic/wwwjdic.cgi?",
      "germany": "http://wwwjdic.biz/cgi-bin/wwwjdic.cgi?",
      "japan": "http://gengo.com/wwwjdic/cgi-data/wwwjdic.cgi?",
      "usa": "http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic.cgi?",
      "sweden": "http://wwwjdic.se/cgi-bin/wwwjdic.cgi?"
    }
    return map[key]
  }

}



if (typeof module !== 'undefined') {
  module.exports = dic;
}
