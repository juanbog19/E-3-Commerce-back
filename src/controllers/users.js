const { User } = require('../db.js');
const axios = require('axios');
const { Op } = require('sequelize');
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

// :::::::: CREAR NUEVO USUARIO ::::::::::::::::::::::

const postUsers = async (req, res) => {
    try {
        const { username, password, email, rol, status, image, address } = req.body;

        const emailVerification = await User.findOne({
            where: {
                email: email
            }
        })

        if (emailVerification) return res.status(STATUS_ERROR).json({ error: "Error. Este email ya existe." });

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userData = { username, password: hashedPassword, email, rol, status, image, address };

        const newUser = await User.create(userData);

        let subject = "NUEVA CUENTA";
        let text = `¡Bienvenido a EcommerceApp! <br> Estamos emocionados de tenerte como parte de nuestra comunidad. Gracias por registrarte en EcommerceApp, tu destino número uno para descubrir y comprar los mejores celulares del mundo.
        <br> En EcommerceApp, te ofrecemos una amplia variedad de celulares, desde los celulares más exclusivas hasta las marcas más reconocidas. Nuestra misión es brindarte una experiencia única y personalizada, adaptada a tus gustos y preferencias. Ya seas un conocedor de la tecnología o un principiante, estamos seguros de que encontrarás algo que te encantará.
        <br> Si tienes alguna pregunta, inquietud o simplemente deseas aprender más sobre los celulares  que ofrecemos, nuestro equipo de soporte está aquí para ayudarte en cada paso del camino. No dudes en ponerte en contacto con nosotros.
        <br> Gracias nuevamente por unirte a EcommerceApp. Esperamos que tu experiencia con nosotros sea excepcional y que disfrutes de cada dispositivo que descubras.
        <br> Con entusiasmo, El equipo de EcommerceApp! `;
        transporter(email, subject, text);

        res.status(STATUS_OK).json(newUser)
    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
}

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } })

        if (!user) return res.status(STATUS_ERROR).json({ error: "Error. El usuario no existe." })

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (isValidPassword) {
            return res.status(STATUS_OK).json(user)
        } else {
            return res.status(STATUS_ERROR).json({ error: "Error. El usuario o la contraseña son incorrectos." })
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