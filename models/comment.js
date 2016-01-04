module.exports = function(sequelize, dataTypes){
    return sequelize.define(
        'Comment',
        { texto: {
            type: dataTypes.STRING,
            validate: { notEmpty : {msg: "--> Falta Comentario"}}
        },
        publicado: {
          type: dataTypes.BOOLEAN,
          defaultValue: false
      }
    }
  );
};
