'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Berita extends Model {
    static associate(models) {
      // Relasi bisa ditambah, misalnya: Berita.belongsTo(models.User)
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
      tableName: 'Beritas',
      timestamps: true
    }
  );
  return Berita;
};
