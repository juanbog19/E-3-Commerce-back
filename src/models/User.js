//MODELO USER
//Acá van todas las propiedades del Usuario
//username: nombre del usuario - obligatiorio - debe ser único
//password: obligatiorio
//email: obligatorio - debe ser unico
//rol: admite 2 valores: user = usuario normal (default), admin = usuario administrador
//status: indica si el usuario esta baneado, false = no baneado, true = baneado
//image: url de la imagen de perfil del usuario
//address: direccion de envio

const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      rol: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      google: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      image: {
        type: DataTypes.STRING,
        //allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        //allowNull: false,
      },
    },
    { timestamps: false }
  );
};
