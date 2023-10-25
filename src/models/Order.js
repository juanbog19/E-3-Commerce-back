//MODELO ORDER
//Acá van todas las propiedades de las ordenes de compra
//order: clave o numero de orden - unico - obligatorio
//amount: monto total de la compra

const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "order",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      order: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
