'use strict';
module.exports = (sequelize, DataTypes) => {
  const jogos = sequelize.define('jogos', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    modalidade: DataTypes.STRING,
    campeonato: DataTypes.STRING,
    rodada: DataTypes.INTEGER,
    datahora: DataTypes.DATE,
    partida: DataTypes.STRING,
    casa: DataTypes.STRING,
    visitante: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  jogos.associate = function(models) {
    // associations can be defined here
  };
  return jogos;
};