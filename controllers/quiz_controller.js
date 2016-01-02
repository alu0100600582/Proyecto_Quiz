var models = require('../models/models');

var quiz = models.Quiz;

exports.show = function(req,res) {
  res.render('quizes/show', {quiz: quiz});
};

exports.answer = function(req, res) {
  var respuesta = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) respuesta = 'Correcto';
  res.render('quizes/answer', { quiz: req.quiz, respuesta: respuesta })
};

exports.index = function(req, res){
  models.Quiz.findAll().then(function(quizes){
    res.render('quizes/index.ejs', {quizes: quizes});
  })
};
