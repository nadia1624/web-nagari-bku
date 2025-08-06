'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SosialMedia extends Model {
    static associate(models) {
    }
  }

  SosialMedia.init({
    facebook: {
      type: DataTypes.STRING,
      allowNull: true
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: true
    },
    x: {
      type: DataTypes.STRING,
      allowNull: true
    },
    youtube: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'SosialMedia',
    tableName: 'SosialMedia',
  });

  return SosialMedia;
};
