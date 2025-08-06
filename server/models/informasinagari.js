'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class InformasiNagari extends Model {
    static associate(models) {
    }
  }

  InformasiNagari.init({
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    visi: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    misi: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    struktur: {
      type: DataTypes.STRING,
      allowNull: true
    },
    kontak: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vidio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    jam_pelayanan: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'InformasiNagari',
    tableName: 'InformasiNagaris',
  });

  return InformasiNagari;
};
