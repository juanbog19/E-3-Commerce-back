//MODELO BRAND
//Acá van todas las propiedades de la marca
//name: nombre de la marca - unico - obligatorio
//description: descripcion de la marca
//image: url de la imagen del logo de la marca

const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "brand",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
