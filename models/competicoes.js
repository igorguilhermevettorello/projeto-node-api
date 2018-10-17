'use strict';
module.exports = (sequelize, DataTypes) => {
  const competicoes = sequelize.define('competicoes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    descricao: DataTypes.STRING,
    logo: DataTypes.STRING,
    modalidadeId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  competicoes.associate = function(models) {
    // associations can be defined here
  };
  return competicoes;
};