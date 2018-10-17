'use strict';
module.exports = (sequelize, DataTypes) => {
  const modalidades = sequelize.define('modalidades', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    descricao: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  modalidades.associate = function(models) {
    // associations can be defined here
  };
  return modalidades;
};