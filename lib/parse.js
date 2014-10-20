var parse = function(text){
  //console.log({text: text});
  var preRegex = /<pre>[\s\S]*?<\/pre>/;
  var liRegex = /<li>[\s\S]*?<\/li>/g;
  var word = /[\S]*/;
  var pos = /\/\([\S]*?\)/;
  var pronunciation = /\[.*?\]/;
  var translations = /\([1-9]*\)/g;

  var pre = preRegex.exec(text);
  var li = liRegex.exec(text);
  var arr = [];
  
  if (pre)      { normalEntries() }
  else if (li)  { glossingEntries() }
  else          { return ["No items were found; try another query."]; }
      
  return arr;

  function glossingEntries(){
    var pronunciation = /【.*?】/;
    var pos = /\\t\([\S]*?\)/;
    var i=0;
    var brRegex = /\<br\>/;
    var stor = [];
    while (li != null) {
      if (li[0].match(brRegex)){
        stor[i] = li[0].substring(li[0].match(brRegex)["index"] + 4);
      } else{
        stor[i] = li[0].substring(5, li[0].length - 5);
      }
      arr[i] = {};
      arr[i].japanese = word.exec(stor[i])[0];
      var ps = pos.exec( stor[i] );
      var pn = pronunciation.exec( stor[i] );
      if (ps) arr[i].pos = ps[0].substring(2, ps[0].length-1);
      if (pn) arr[i].pronunciation = pn[0].substring(1, pn[0].length-1);
      
      var en = stor[i].match(translations);

      arr[i].english = [];

      if (en){
        for (j=0; j<en.length; j++){
          if (en[j+1]) {
            arr[i].english.push( stor[i].substring(stor[i].indexOf(en[j]) + 4, stor[i].indexOf(en[j+1]) - 1 ) );
          } else {
            arr[i].english.push( stor[i].substring(stor[i].indexOf(en[j]) + 4, stor[i].length - 5) );
          }
        }
      } else {
        if (ps)   {  arr[i].english[0] = stor[i].substring(ps["index"] + ps[0].length).trim().replace("\/", "").replace(/\<\/li\>/, "");   }
        else      {   arr[i].english[0] = stor[i].replace('\/', "").replace(/\<\/li\>/, "");     }
      }

      //arr[i].original = stor[i];
      
      li = liRegex.exec(text);
      i++;
    }
  }

  function normalEntries(){
    var parsed = pre[0].replace(/\/\(P\)\//g, '').split("\n");
    for (var i=0; i<parsed.length-2; i++){
      arr[i] = {};
      arr[i].japanese = word.exec(parsed[i+1])[0];
      var ps = pos.exec(parsed[i+1]);
      var pn = pronunciation.exec(parsed[i+1]);
      if (ps) arr[i].pos = ps[0].substring(2, ps[0].length-1);
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
        if (ps)   {  arr[i].english[0] = parsed[i+1].substring(ps["index"] + ps[0].length).trim().replace("\/", "");   }
        else      {   arr[i].english[0] = parsed[i+1].replace('\/', "");     }
      }

      //arr[i].original = parsed[i+1];
    }
  }

}

if (typeof module !== 'undefined') {
  module.exports = parse;
}
/* for testing
var D = require('./');
var d = new D();
var resp;
d('辞書').then(function(data){console.log(data); resp = data});

var Dictionary = require('./');
var dict = new Dictionary({
  dictionary: "life-science",
  input: "english"
});

dict('chemolithotroph').then(function(result){
  console.log(result);
});


var Dictionary = require('./');
var dict = new Dictionary({
  dictionary: "glossing"
});

dict('飛べねぇ豚はただのブタだ').then(function(result){
  console.log(result);
});



*/