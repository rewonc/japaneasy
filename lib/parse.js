var parse = function(text){
  return {text: text}
}

if (typeof module !== 'undefined') {
  module.exports = parse;
}