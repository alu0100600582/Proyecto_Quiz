var models = require('../models/models');

var quiz = new Quiz();

exports.show = function(req,res) {
  models.Quiz.findAll().success(function(quiz){
  res.render('quizes/show', {quiz: quiz});
  })
};

exports.answer = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz){
  if (req.query.respuesta === quiz[0].respuesta) {
    res.render('quizes/answer', {respuesta: 'Correcto'});
  }else{
  res.render('quizes/answer', {respuesta: 'Incorrecto'});
}
})
};

exports.index = function(req, res){
  models.Quiz.findAll().then(function(quizes){
    res.render('quizes/index.ejs', {quizes: quizes});
  })
};
