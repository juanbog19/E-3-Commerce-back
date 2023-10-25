//MODELO BANNER
//Acá van todas las propiedades de los banners
//name: nombre del banner, sirve como identificador (banner1, banner2, bannerPrincipal, etc..)
//image: url de la imagen del banner

const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "banner",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
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
