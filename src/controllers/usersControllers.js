const { User } = require('../db.js');
const bcrypt = require('bcryptjs');
const { transporter } = require('./sendMail.js')

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

// :::::::: OBTENER USUARIO POR ID ::::::::::::::::::::::

const getUserId = async (req, res) => {
    try {

        const { id } = req.params;

        const user = await User.findByPk(id);

        res.status(STATUS_OK).json(user)

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

        const usernameVerification = await User.findOne({
            where: {
                username: username
            }
        })

        if (emailVerification) return res.status(STATUS_ERROR).json({ error: "El correo electrónico ya existe" });

        if (usernameVerification) return res.status(STATUS_ERROR).json({ error: "El usuario ya existe" });

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userData = { username, password: hashedPassword, email, rol, status, image, address };

        const newUser = await User.create(userData);

        let subject = `👋 Bienvenido/a a PhonePulse ${username}!`;
        transporter(email, subject, username);

        res.status(STATUS_OK).json(newUser)
    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
}

// :::::::: EDITAR USUARIO ::::::::::::::::::::::

const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, image, address } = req.body;

        const userEdit = await User.update({ username, email, image, address }, { where: { id } });

        const usersDb = await User.findAll();

        res.status(STATUS_OK).json(usersDb)
    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
}

// :::::::: BANEAR USUARIO ::::::::::::::::::::::

const banUser = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await User.findByPk(id)
        if (!record) {
            return res.status(STATUS_ERROR).send('Registro no encontrado')
        }

        const newBanUser = !record.status
        await User.update({ status: newBanUser }, { where: { id } })

        const userUpdated = await User.findByPk(id)

        res.status(STATUS_OK).json(userUpdated)
    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
}

module.exports = {
    getUsers,
    getUserId,
    postUsers,
    editUser,
    banUser
}