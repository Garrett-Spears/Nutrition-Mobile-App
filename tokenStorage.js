exports.storeToken = function ( tok ){
    try{
      global.userId = tok;
    }
    catch(e){
      console.log(e.message);
    }
}
exports.retrieveToken = function (){
    var ud;
    try{
      ud = global.userId;
    }
    catch(e){
      console.log(e.message);
    }
    return ud;
}