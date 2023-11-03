const { User } = require('../db.js');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

const STATUS_OK = 200;
const STATUS_ERROR = 500;
const SECRET_KEY = process.env.SECRET_KEY;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID; 

const client = new OAuth2Client(CLIENT_ID);

const loginUser = async (req, res) => {
    try {
      // Comprobar si se está autenticando con Google
      const { email, password, googleToken } = req.body;

      if (googleToken) {
        const ticket = await client.verifyIdToken({
          idToken: googleToken,
          audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const emailFromGoogle = payload.email;
        const user = await User.findOne({
          where: { email: emailFromGoogle },
        });

        if (user) {
          const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
            expiresIn: "1h",
          });
          return res.status(STATUS_OK).json({ token });
        }
        return res
          .status(STATUS_ERROR)
          .json({ error: "Error. El usuario no existe." });
      }

      // Autenticación con email y contraseña
      const user = await User.findOne({ where: { email } });
      if (!user)
        return res
          .status(STATUS_ERROR)
          .json({ error: "Error. El usuario no existe." });

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
          expiresIn: "1h",
        });
        return res.status(STATUS_OK).json({ token });
      } else {
        return res.status(STATUS_ERROR).json({
          error: "Error. El usuario o la contraseña son incorrectos.",
        });
      }
    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
}

module.exports = {
    loginUser
}