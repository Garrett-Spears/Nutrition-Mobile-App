exports.storeToken = function ( tok ){
    try{
      global.token = tok;
    }
    catch(e){
      console.log(e.message);
    }
}
exports.retrieveToken = function (){
    var ud;
    try{
      ud = global.token;
    }
    catch(e){
      console.log(e.message);
    }
    return ud;
}