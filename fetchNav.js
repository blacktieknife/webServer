const request = require("request");

var fetchNav = function(){
   return new Promise(function(resolve, reject){
request({
    url:`https://warm-crag-74333.herokuapp.com/navigation`,
    json:true
},
function(error, response, body){
 if(!error && response.statusCode == 200){
resolve(body)
 } else {
     reject({error:error});
 }
});
       
   });
}

module.exports = {
   fetchNav:fetchNav
}
