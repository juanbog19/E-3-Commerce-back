const { User } = require('../db.js');
const axios = require('axios');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const STATUS_OK = 200;
const STATUS_ERROR = 500;

// :::::::: OBTENER TODOS LOS USUARIOS ::::::::::::::::::::::

const getUsers = async (req, res) => {
    try {
        const usersDb = await User.findAll();
        
        res.status(STATUS_OK).json(usersDb);
    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
}

// :::::::: CREAR NUEVO USUARIO ::::::::::::::::::::::

const postUsers = async (req, res) => {
    try {
        const { username, password, email, rol, status, image, address } = req.body;

        const emailVerification = await User.findOne({
            where: {
                email: email
            }
        })

        if(emailVerification) return res.status(STATUS_ERROR).json({error: "Error. Este email ya existe."});

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userData = { username, password: hashedPassword, email, rol, status, image, address };

        const newUser = await User.create(userData);

        res.status(STATUS_OK).json(newUser)
    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
}

const loginUser = async (req, res) => {
    try {

        const {email, password} = req.body;

        const user = await User.findOne({where: {email}})

        if(!user) return res.status(STATUS_ERROR).json({error: "Error. El usuario no existe."})

        const isValidPassword = await bcrypt.compare(password, user.password)

        if(isValidPassword){
            return res.status(STATUS_OK).json(user)
        }else{
            return res.status(STATUS_ERROR).json({error: "Error. El usuario o la contraseña son incorrectos."})
        }
    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
}

module.exports = {
    getUsers,
    postUsers,
    loginUser
}