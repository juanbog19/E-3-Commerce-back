const jwt = require('jsonwebtoken')
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const generateJWT = (uid = '') => {

    return new Promise((resolve, reject) => {
        const payload = {uid}

        jwt.sign(payload, SECRET_KEY, {
            expiresIn: '15m'
        }, (err, token) => {
            if(err){
                console.log(err)
                reject('No se pudo generar el token')
            }else{
                resolve(token)
            }
        })
    })
}


module.exports = {
    generateJWT
}