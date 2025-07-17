'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Umkm extends Model {
    static associate(models) {
    }
  }
  Umkm.init(
    {
      id_umkm: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nama_pemilik: {
        type: DataTypes.STRING,
        allowNull: false
      },
      produk: {
        type: DataTypes.STRING,
        allowNull: false
      },
      alamat: {
        type: DataTypes.STRING,
        allowNull: false
      },
      deskripsi: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      no_hp : {
        type: DataTypes.STRING,
        allowNull : true
      },
      gambar : {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'Umkm',
      tableName: 'Umkms',
      timestamps: true
    }
  );
  return Umkm;
};
