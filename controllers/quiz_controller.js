var models = require('../models/models');

// MW que permite acciones solamente si el quiz objeto pertenece al usuario logeado o si es cuenta admin
exports.ownershipRequired = function(req, res, next){
    var objQuizOwner = req.quiz.UserId;
    var logUser = req.session.user.id;
    var isAdmin = req.session.user.isAdmin;

    if (isAdmin || objQuizOwner === logUser) {
        next();
    } else {
        res.redirect('/');
    }
};

exports.load = function(req, res, next, quizId) {
  models.Quiz.find({
      where: { id: Number(quizId)},
      include: [{model: models.Comment}]
    }).then(function(quiz) {
        if (quiz) {
          req.quiz = quiz;
          next();
        } else { next(new Error('No existe quizId = '+quizId)); }
      }
      ).catch( function(error) { next(error) });
};


exports.show = function(req,res) {
  res.render('quizes/show', {quiz: req.quiz, errors: []});
};

exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) resultado = 'Correcto';
  res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado, errors: [] });
};

exports.index = function(req,res) {
  models.Quiz.findAll().then(function(quizes){
    res.render('quizes/index', {quizes: quizes, errors: []});
  })
};

exports.perfil = function(req,res) {
  var options = {};
  if(req.user){
    options.where = {UserId: req.user.id}
  }
  models.Quiz.findAll(options).then(function(quizes){
    res.render('quizes/index', {quizes: quizes, errors: []});
  })
};

exports.new = function(req,res){
  var quiz = models.Quiz.build(
    {pregunta: 'Pregunta', respuesta: 'Respuesta'}
  );
  res.render('quizes/new', {quiz: quiz, errors: []});
 };


 exports.create = function(req, res) {
   req.body.quiz.UserId = req.session.user.id;
   var quiz = models.Quiz.build( req.body.quiz );

   quiz.validate().then(function(err){
       if (err) {
         res.render('quizes/new', {quiz: quiz, errors: err.errors});
       } else {
         quiz // save: guarda en DB campos pregunta y respuesta de quiz
         .save({fields: ["pregunta", "respuesta", "UserId"]})
         .then( function(){ res.redirect('/quizes')})
       }      // res.redirect: Redirección HTTP a lista de preguntas
     }
   ).catch(function(error){next(error)});
 };


 exports.edit = function(req, res) {
  var quiz = req.quiz;
  res.render('quizes/edit', { quiz: quiz, errors: [] });
};


exports.update =function(req,res){
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;

  req.quiz.validate().then(function(err){
      if(err){
        res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
      } else {
          req.quiz.save({fields: ['pregunta', 'respuesta']}).then(function(){res.redirect('/quizes')});
      }
    });
};


exports.destroy =function(req,res){
  req.quiz.destroy().then( function(){
    res.redirect('/quizes');
  }).catch(function(error){next(error)});
};
