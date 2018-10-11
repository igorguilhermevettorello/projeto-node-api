'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('jogos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      modalidade: {
        allowNull: false,
        type: Sequelize.STRING
      },
      campeonato: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rodada: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      datahora: {
        allowNull: false,
        type: Sequelize.DATE
      },
      partida: {
        allowNull: false,
        type: Sequelize.STRING
      },
      casa: {
        allowNull: false,
        type: Sequelize.STRING
      },
      visitante: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('jogos');
  }
};