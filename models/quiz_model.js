var AbstractQuiz = require('../models/abstract_quiz_model.js');
var PreguntaCorta = require('../models/PreguntaCorta.js');
var PreguntaLarga = require('../models/PreguntaLarga.js');
var Respuesta = require('../models/respuesta.js');
var PreguntaSelecSimple = require('../models/PreguntaSimple.js');
var PreguntaSelecMultiple = require('../models/PreguntaMultiple.js');

function Quiz() {

  AbstractQuiz.call(this);

  this.q.push(

    { pregunta: new PreguntaSelecSimple('¿Capital de Grecia?', ['Madrid', 'Roma', 'Atenas']),
      respuesta: new Respuesta('Atenas')
    },

    { pregunta: new PreguntaSelecMultiple('¿Qué animales son mamíferos?', ['Ornitorrinco', 'Canguro', 'Ballena', 'Gato']),
      respuesta: new Respuesta(['Ballena', 'Gato'])
    },

    { pregunta: new PreguntaCorta('¿Capital de Italia?'),
      respuesta: new Respuesta(/^\s*roma\s*$/i)
    },


    { pregunta: new PreguntaLarga('¿Quien reinaba en España cuando se descubrió América?'),
      respuesta: new Respuesta(/\b(Isabel\s+y?\s*Fernando)|(Fernando\s+[ey]?\s*Isabel)|(reyes\s+cat[oó]licos)\b/i)
    },

    { /* Código inseguro. ¡No ejecute esta pregunta salvo en un
         entorno en el que el código del "alumno" sea fiable!
       */
      pregunta: new PreguntaLarga('Escriba una función JavaScript de nombre <tt>square</tt> '+
      'que recibe un número y devuelve el cuadrado'),
      respuesta: new Respuesta( function(x) {
        try {
          eval(x); /* DANGER DANGER DANGER */
          var z = Math.floor(Math.random()*100);
          return (square(z) == z*z);
        }
        catch(e) {
          return false;
        }
        return false;
      })
    }
  );

  // insertar unas cuantas preguntas sobre
  // la tabla de multiplicar
  var self  = this;
  for(var i = 0; i<3;i++) {
    (function() {
      var n1 = Math.randomInt(9)+1;
      var n2 = Math.randomInt(9)+1;
      self.q.push(
        { pregunta: new PreguntaCorta('¿ '+n1+'x'+n2+"= ?"),
          respuesta: new Respuesta(function(x) {
            return (x == n1*n2);
        })
      });
    })();
  }
}

Quiz.prototype = new AbstractQuiz();
Quiz.prototype.constructor = Quiz;

Quiz.prototype.numQuestions = function() {
  return this.q.length;
}

Quiz.prototype.getQ = function(x){
  return this.q[x]['pregunta'].get_pregunta();
}

module.exports = Quiz;
