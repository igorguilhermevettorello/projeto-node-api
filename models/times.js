'use strict';
module.exports = (sequelize, DataTypes) => {
  const times = sequelize.define('times', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    descricao: DataTypes.STRING,
    logo: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  times.associate = function(models) {
    // associations can be defined here
  };
  return times;
};