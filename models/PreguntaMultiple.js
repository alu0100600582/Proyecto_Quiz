var EJS = require('ejs');

var Pregunta = require('../models/pregunta.js');

function PreguntaSelecMultiple(x, array) {
  Pregunta.call(this);

  this.pregunta_ = x;
  this.array_ = array;
  this.area_;

  var self = this;

  EJS.renderFile('views/quizes/PreguntaMultiple.ejs',{array: this.array_}, function(err,html){
    if(err) throw err;
    else self.area_ = html;
  });
}

PreguntaSelecMultiple.prototype = new Pregunta();

PreguntaSelecMultiple.prototype.constructor = PreguntaSelecMultiple;

PreguntaSelecMultiple.prototype.get_pregunta = function(){
  return this.pregunta_;
}

PreguntaSelecMultiple.prototype.get_area = function(){
  return this.area_;
}

module.exports = PreguntaSelecMultiple;
