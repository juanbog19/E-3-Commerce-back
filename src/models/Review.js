//MODELO REVIEW
//Acá van todas las propiedades del modelo Review
//comment: guarda el comentario de la review - obligatiorio
//rating: guarda el rating de la review - obligatiorio
//status: true = comentario aprobado, false = comentario desaprobado, valor por default = true
//date: fecha en la que se hizo la review, valor por defecto = fecha de hoy
//La relacion con el usuario y con la orden de compra se hace en el controller

const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "review",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.STRING,
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
