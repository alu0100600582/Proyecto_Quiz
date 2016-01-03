var models = require('../models/models');
var Quiz = models.Quiz;


exports.load = function(req, res, next, quizId) {
  Quiz.findById(quizId).then(
      function(quiz) {
        if (quiz) {
          req.quiz = quiz;
          next();
        } else { next(new Error('No existe quizId = '+quizId)); }
      }
      ).catch( function(error) { next(error); });
};

exports.index = function(req, res) {
  Quiz.findAll().then(function(quizes){
    res.render('quizes/index', { quizes: quizes});
  }).catch(function(error) { next(error); });
};

exports.show = function(req,res) {
  res.render('quizes/show', {quiz: req.quiz});
};

exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) resultado = 'Correcto';
  res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado })
};

exports.new = function(req,res){
  var quiz = Quiz.build(
    {pregunta: 'Pregunta', respuesta: 'Respuesta'}
  );
  res.render('quizes/new', {quiz, quiz});
 };


 exports.create =function(req,res){
   var quiz = models.Quiz.build(req.body.quiz);

   quiz.validate().then(function(err){
     if(err){
       res.render('quizes/new', {quiz: quiz, errors: err.errors});
     } else {
         quiz.save({fields: ['pregunta', 'respuesta']}).then(function(){
         res.redirect('/quizes')});
     }
   });
 };
