var dic = function(config){
  var dictionary;
  //set config varaibles
  if (config && config.dictionary){
    if (typeof config.dictionary != "string") throw new Error("Dictionary input must be a string");
    if (!mapDictionary(config.dictionary)) throw new Error("Invalid parameter for dictionary")
    dictionary = mapDictionary(config.dictionary);
  }


  return search

  function search (text){
    if(text === "") {throw new Error("Input string cannot be blank")}
    if(text === null || text === undefined) {throw "You must provide input that is not null or undefined"}
    if(typeof text != "string") {throw "Input must be a string"}

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
      "gloss": "9",
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

}



if (typeof module !== 'undefined') {
  module.exports = dic;
}
