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
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      special_features: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
