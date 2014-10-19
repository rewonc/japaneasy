var http = require('http');
var generateCode = require('./lib/url');
var parse = require('./lib/parse');
var Q = require('q');


var dic = function(config){
  var code = generateCode(config);
  var timeout, default_mirror;

  if (config && config.timeout){
          if (typeof config.timeout != "number" || config.timeout < 0) throw new Error("timeout must be a positive integer");
          timeout = config.timeout;
  } else  { timeout = 500 }
  if (config && config.mirror){
    if (typeof config.mirror != "string") throw new Error("Default mirror input must be a string");
    if (!mapMirror(config.mirror)) throw new Error("Invalid mirror name");
    default_mirror = config.mirror
  } else { default_mirror = "usa" }


  return search;



  function search (text){
    var resolved = false;
    var counter = 0;
    var deferred = Q.defer();
    if(text === "") {throw new Error("Input string cannot be blank")}
    if(text === null || text === undefined) {throw "You must provide input that is not null or undefined"}
    if(typeof text != "string") {throw "Input must be a string"}
    
    //send first request
    var req = query(default_mirror);
    req.setTimeout(timeout, tryAnother);

    return deferred.promise;

    function query(mirror){
      return http.get(mapMirror(mirror) + code + text, function(res) {
        res.setEncoding('utf8');
        console.log("Got response: " + res.statusCode);
        resolved = true;
        var body = '';
        res.on('data', function(chunk)  {  body += chunk;  });
        res.on('end', function()        {  deferred.resolve( parse(body) );  });
      }).on('error', function(e) {
        if (counter > 4) {deferred.reject(e)}
        console.log("Got error: " + e.message);
        counter++;
      });
    }
    function tryAnother(){
      if (!resolved){
        var arr = ['usa', 'japan', 'canada', 'germany', 'sweden', 'austrailia'];
        var num = Math.floor(Math.random()*6);
        console.log('trying mirror: ' + arr[num]);
        query(arr[num]);
      } else{
        console.log('already resolved--done!');
      }
    }

  }

  function mapMirror(key){
    var map = {
      "austrailia": "http://www.csse.monash.edu.au/~jwb/cgi-bin/wwwjdic?",
      "canada": "http://www.ottix.net/cgi-bin/wwwjdic/wwwjdic?",
      "germany": "http://wwwjdic.biz/cgi-bin/wwwjdic?",
      "japan": "http://gengo.com/wwwjdic/cgi-data/wwwjdic?",
      "usa": "http://www.edrdg.org/cgi-bin/wwwjdic/wwwjdic?",
      "sweden": "http://wwwjdic.se/cgi-bin/wwwjdic?"
    }
    return map[key]
  }



}



if (typeof module !== 'undefined') {
  module.exports = dic;
}
