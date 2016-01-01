var Pregunta = require('../models/pregunta.js');

function PreguntaLarga(x) {
  Pregunta.call(this);

  this.pregunta_ = x;
  this.area_ = "<textarea name='respuesta' placeholder='Responda aquí' rows='4' cols='50'></textarea>";
}

PreguntaLarga.prototype = new Pregunta();

PreguntaLarga.prototype.constructor = PreguntaLarga;

PreguntaLarga.prototype.get_area = function(){
  return this.area_;
}

PreguntaLarga.prototype.get_pregunta = function(){
  return this.pregunta_;
}

module.exports = PreguntaLarga;
