const { User } = require('../db.js');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { generateJWT } = require('../helpers/generateJwt.js');
const { googleVerify } = require('../helpers/google-verify.js');
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

const login = async (req, res) => {

  const { email, password } = req.body;

  try {
    //Verificamos si el email existe
    const usuario = await User.findOne({ where: { email } })
    //console.log(usuario)
    if (!usuario) {
      return res.status(400).json({ msg: 'El email o la contraseña son incorrectos' })
    }

    //Si el usuario esta activo
    if (!usuario.status) {
      return res.status(400).json({ msg: 'Tu perfil se encuentra baneado. Por favor contacta con un administrador.' })
    }

    //Verificar la contraseña
    const validPassword = bcrypt.compareSync(password, usuario.password)
    if (!validPassword) {
      return res.status(400).json({ msg: 'El email o la contraseña son incorrectos' })
    }

    //Generar el JWT
    const token = await generateJWT(usuario.id)

    res.json({
      usuario,
      token
    })

  } catch (error) {
    console.log(error)
    res.status(STATUS_ERROR).end(error.message)
  }
}

const googleSignIn = async (req, res) => {

  const { id_token } = req.body;

  try {

    const { username, image, email } = await googleVerify(id_token)

    let usuario = await User.findOne({ where: { email } })

    if (!usuario) {
      const data = {
        username,
        email,
        password: ':P',
        image,
        google: true
      }

      usuario = new User(data)
      await usuario.save()
    }

    if (!usuario.status) {
      return res.status(401).json({
        msg: 'Usuario baneado'
      })
    }

    const token = await generateJWT(usuario.id)

    res.json({
      usuario,
      token
    })
  } catch (error) {
    res.status(400).json({ msg: 'El token no se pudo verificar' })
  }
}

module.exports = {
  loginUser,
  login,
  googleSignIn
}