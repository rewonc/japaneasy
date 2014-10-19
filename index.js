var generateCode = require('./lib/url');
var Q = require('q');

var dic = function(config){
  var code = generateCode(config);
  var timeout, default_mirror;

  if (config && config.timeout){
          if (typeof config.timeout != "number" || config.timeout < 0) throw new Error("timeout must be a positive integer");
          timeout = config.timeout;
  } else  { timeout = 200 }
  if (config && config.mirror){
    if (typeof config.mirror != "string") throw new Error("Default mirror input must be a string");
    if (!mapMirror(config.mirror)) throw new Error("Invalid mirror name");
    default_mirror = config.mirror
  } else { default_mirror = "usa" }


  return search;



  function search (text){
    var deferred = Q.defer();
    if(text === "") {throw new Error("Input string cannot be blank")}
    if(text === null || text === undefined) {throw "You must provide input that is not null or undefined"}
    if(typeof text != "string") {throw "Input must be a string"}
    /*request(encodeURI(code + text), function (error, response, body) {
      if (error)                            {deferred.reject(new Error(error));}
      else if (response.statusCode != 200)  {deferred.reject(new Error("status code: " + response.statusCode))}
      else                                  {deferred.resolve(body)}
    });*/
    return deferred.promise;
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
