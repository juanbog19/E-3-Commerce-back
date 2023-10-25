//MODELO REVIEW
//Acá van todas las propiedades de las Reviews
//comment: comentario de la review - obligatiorio
//rating: rating de la review - valores del 1 al 5 - obligatiorio
//status: true = comentario aprobado, false = comentario desaprobado, valor por default = true
//date: fecha en la que se hizo la review, valor por defecto = fecha de hoy
//La relacion con el usuario y con la orden de compra se hace en el controller

const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "review",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
