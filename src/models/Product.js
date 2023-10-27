//MODELO PRODUCT
//Acá van todas las propiedades del Producto
//model: nombre del producto - obligatiorio - debe ser único
//memory: cantidad de memoria RAM (en GB)
//storage: cantidad de almacenamiento (en GB)
//cpu: modelo del CPU
//battery: capacidad de la bateria (en mAh)
//size: tamaño de la pantalla (en pulgadas)
//special_features: otras caracteristicas (wiFi, bluetooth, etc.. esto es opcional)
//La relacion con la marca se hace en el controller

const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      memory: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      storage: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cpu: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      battery: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      size: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      special_features: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
