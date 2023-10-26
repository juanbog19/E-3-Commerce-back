const { User } = require('../db.js');
const bcrypt = require('bcryptjs');

const STATUS_OK = 200;
const STATUS_ERROR = 500;

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
    loginUser
}