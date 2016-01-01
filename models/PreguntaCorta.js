var Pregunta = require('../models/pregunta.js');

function PreguntaCorta(x) {
  Pregunta.call(this);

  this.pregunta_ = x;
  this.area_ = "<input type='text' name='respuesta' placeholder='Responda aquí'' />";
}

PreguntaCorta.prototype = new Pregunta();

PreguntaCorta.prototype.constructor = PreguntaCorta;

PreguntaCorta.prototype.get_area = function(){
  return this.area_;
}

PreguntaCorta.prototype.get_pregunta = function(){
  return this.pregunta_;
}

module.exports = PreguntaCorta;
