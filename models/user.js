// Modelo User con validación y encriptación de contraseñas

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: { notEmpty: {msg: "-> Falta username." }}
    },

    password: {
      type: DataTypes.STRING,
      validate: { notEmpty: {msg: "-> Falta password."}}
    },


    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return User;
}
