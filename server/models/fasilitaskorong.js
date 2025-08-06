'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FasilitasKorong extends Model {
    static associate(models) {
      FasilitasKorong.belongsTo(models.Korong, {
        foreignKey: 'id_korong',
        as: 'korong'
      });
    }
  }

  FasilitasKorong.init({
    id_fasilitas :{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_korong: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nama_fasilitas: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'FasilitasKorong',
    tableName: 'FasilitasKorongs' 
  });

  return FasilitasKorong;
};
