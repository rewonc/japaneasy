var url = function(config){
  var dictionary, method, encoding, custom, default_mirror, last;
  config = config || {};
  //if either dictionary or method is glossing, set the other one to that value
  if (config.dictionary == "glossing" || config.method == "glossing") {
    config.dictionary = "glossing";
    config.method = "glossing";
  }
  //set config varaibles  TODO: DRY up
  if (config.dictionary){
    if (typeof config.dictionary != "string") throw new Error("Dictionary input must be a string");
    if (!mapDictionary(config.dictionary)) throw new Error("Invalid parameter for dictionary")
    dictionary = mapDictionary(config.dictionary);
  } else { dictionary = "1"; }
  if (config.method){
    if (typeof config.method != "string") throw new Error("Method input must be a string");
    if (!mapMethod(config.method)) throw new Error("Invalid parameter for method")
    method = mapMethod(config.method);
  } else { method = "U"; }
  if (config.encoding){
    if (typeof config.encoding != "string") throw new Error("Encoding input must be a string");
    if (!encode(config.encoding)) throw new Error("Invalid parameter for encoding");
  }
  if (config.custom){
    if (typeof config.custom != "string") throw new Error("Custom input must be a string");
    if (config.custom.length < 4) throw new Error("Custom input must be at least 4 characters long");
    custom = config.custom;
  }
  
  if (config.input == "japanese")     { last = "J" }
  else if (config.input == "english") { last = "E" }
  else                                { last = "P" }
  if (config.dictionary == "glossing" && config.noRepeat) { last = "G"}
  

  if (custom) return custom;
  return dictionary + "Z" + method + last;



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
      if (method == "U")      {method = "S"}
      else if (method == "M") {method = "N"}
      else if (method == "I") {method = "H"}
      return true;
    } else if (key == "EUC" || key == "ISO-2022-JP" || key == "UCS" || key == "ASCII"){
      if (method == "U")      {method = "D"}
      else if (method == "M") {method = "K"}
      else if (method == "I") {method = "G"}
      return true;
    } else{
      return false;
    }
  }

  

}

if (typeof module !== 'undefined') {
  module.exports = url;
}