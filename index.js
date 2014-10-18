var generateUrl = require('./lib/url');

var dic = function(config){
  
  var url = generateUrl(config);


  if (config && config.timeout){
    if (typeof config.timeout != "number" || config.timeout < 0) throw new Error("timeout must be a positive integer");
    timeout = config.timeout;
  }


  return search;



  function search (text){
    if(text === "") {throw new Error("Input string cannot be blank")}
    if(text === null || text === undefined) {throw "You must provide input that is not null or undefined"}
    if(typeof text != "string") {throw "Input must be a string"}
    return 'hello world';
  }



}



if (typeof module !== 'undefined') {
  module.exports = dic;
}
