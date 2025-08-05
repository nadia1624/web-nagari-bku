'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Berita extends Model {
    static associate(models) {
    }
  }
  Berita.init(
    {
      id_berita: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      judul: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gambar: {
        type: DataTypes.STRING,
        allowNull: true
      },
      isi_berita: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Berita',
      tableName: 'Berita',
      timestamps: true
    }
  );
  return Berita;
};
