function Respuesta(x){

  // Si es entero o cadena
  if(typeof(x)==='string' || typeof(x)==='number'){
    return function(res){return res === x;};
  }

  // Si es una expresión regular
  else if(x instanceof RegExp){
    return function(res){return res.match(x);};
  }

  // Si es un array
  else if(x instanceof Array){
    return function(res){
      if(x.length != res.length) return false;

      var opc = true;

      for(var i=0; i<x.length; i++){
        if(x[i] != res[i]) opc = false;
      }

      return opc;
    };
  }

  // Si es una funcion
  else {
    return x;
  }
}

module.exports = Respuesta;
