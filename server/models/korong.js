'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Korong extends Model {
    static associate(models) {
      Korong.hasMany(models.FasilitasKorong, {
        foreignKey: 'id_korong',
        as: 'fasilitas'
      });
    }
  }

  Korong.init({
    id_korong: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nama_korong: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deskripsi_korong: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    jumlah_wanita: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    jumlah_pria: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Korong',
    tableName: 'Korongs'
  });

  return Korong;
};
