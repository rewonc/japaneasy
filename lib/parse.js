var parse = function(text){
  var preRegex = /<pre>[\s\S]*<\/pre>/;
  var word = /[\S]*/;
  var pos = /\/\([\S]*\)/;
  var pronunciation = /\[.*\]/;
  var translations = /\([1-9]*\)/g;

  var parsed = preRegex.exec(text)[0].replace(/\/\(P\)\//g, '').split("\n");
  var arr = [];
  for (var i=0; i<parsed.length-2; i++){
    arr[i] = {};
    arr[i].japanese = word.exec(parsed[i+1])[0];
    var ps = pos.exec(parsed[i+1]);
    var pn = pronunciation.exec(parsed[i+1]);
    arr[i].pos = ps[0].substring(2, ps[0].length-1);
    if (pn) arr[i].pronunciation = pn[0].substring(1, pn[0].length-1);
    var en = parsed[i+1].match(translations);
    arr[i].english = [];
    
    if (en){
      for (j=0; j<en.length; j++){
        if (en[j+1]) {
          arr[i].english.push( parsed[i+1].substring(parsed[i+1].indexOf(en[j]) + 4, parsed[i+1].indexOf(en[j+1]) - 1 ) );
        } else {
          arr[i].english.push( parsed[i+1].substring(parsed[i+1].indexOf(en[j]) + 4 ) );
        }
      }
    } else {
      arr[i].english[0] = parsed[i+1].substring(ps["index"] + ps[0].length).trim();
    }

    //arr[i].original = parsed[i+1];
  }
  return arr;
}

if (typeof module !== 'undefined') {
  module.exports = parse;
}
/* for testing
var D = require('./');
var d = new D();
var resp;
d('hello').then(function(data){console.log(data); resp = data});
*/