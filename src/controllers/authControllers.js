const { User } = require('../db.js');
const bcrypt = require('bcryptjs');
require("dotenv").config();

const STATUS_OK = 200;
const STATUS_ERROR = 500;
const SECRET_KEY = process.env.SECRET_KEY;

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } })

        if (!user) return res.status(STATUS_ERROR).json({ error: "Error. El usuario no existe." })

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (isValidPassword) {
            const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
              expiresIn: "1h",
            });
            return res.status(STATUS_OK).json({ token });
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