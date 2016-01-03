module.exports = function(sequelize, dataTypes) {
    return sequelize.define('Quiz',{
        pregunta: {
            type: dataTypes.STRING,
            validate: { notEmpty: {msg: "--> Falta Pregunta"}}
        },
        respuesta: {
            type: dataTypes.STRING,
            validate: { notEmpty: {msg: "--> Falta Respuesta"}}
        }
    });
};  
