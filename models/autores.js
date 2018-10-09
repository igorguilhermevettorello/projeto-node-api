'use strict';
module.exports = (sequelize, DataTypes) => {
  const autores = sequelize.define('autores', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  autores.associate = function(models) {
    // associations can be defined here
  };
  return autores;
};