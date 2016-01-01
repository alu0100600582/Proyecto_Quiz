var EJS = require('ejs');

var Pregunta = require('../models/pregunta.js');

function PreguntaSelecSimple(x, array) {
  Pregunta.call(this);

  this.pregunta_ = x;
  this.array_ = array;
  this.area_;

  var self = this;

  EJS.renderFile('views/quizes/PreguntaSimple.ejs',{array: this.array_}, function(err,html){
    if(err) throw err;
    else self.area_ = html;
  });
}

PreguntaSelecSimple.prototype = new Pregunta();

PreguntaSelecSimple.prototype.constructor = PreguntaSelecSimple;

PreguntaSelecSimple.prototype.get_pregunta = function(){
  return this.pregunta_;
}

PreguntaSelecSimple.prototype.get_area = function(){
  return this.area_;
}

module.exports = PreguntaSelecSimple;
