var path = require('path');

var databaseURL = process.env.DATABASE_URL          || 'sqlite://:@:/';

var url=databaseURL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;


// Cargar Modelo ORM
var Sequelize = require('sequelize');


// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }
);

// Importar definicion de la tabla Quiz
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

// Importar definicion de la tabla Comment
var comment_path = path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);

// Importar definicion de la tabla Comment
var user_path = path.join(__dirname,'user');
var User = sequelize.import(user_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

// los quizes pertenecen a un usuario registrado
Quiz.belongsTo(User);
User.hasMany(Quiz);

// exportar tablas
exports.Quiz = Quiz;
exports.Comment = Comment;
exports.User = User;

// sequelize.sync() inicializa tabla de preguntas en DB

sequelize.sync().then(function() {
	Quiz.count().then(function (count) {
		if(count === 0) {
			Quiz.create({pregunta: 'Capital de Italia', respuesta: 'Roma'});
			Quiz.create({pregunta: 'Capital de Portugal', respuesta: 'Lisboa'})
			.then(function(){console.log('Base de datos (quiz) inicializada');});
		}
	});
	User.count().then(function (count) {
		if(count === 0) {
			User.create({username: 'admin',password: '1234', isAdmin: true});
      User.create({username: 'pepe',password: '5678'})
			.then(function(){console.log('Base de datos (usuarios) inicializada');});
		}
	});

});
