"use strict";
module.exports = (sequelize, DataTypes) => {
  var usuarios = sequelize.define(
    "Usuarios",
    {
      Id: DataTypes.INTEGER,
      Login: DataTypes.STRING,
      Password: DataTypes.STRING,
      CreatedAt: DataTypes.DATE,
      UpdatedAt: DataTypes.DATE
    },
    {}
  );
  usuarios.associate = function(models) {
    // associations can be defined here
  };
  return usuarios;
};
