const {Router} = require("express");
const router = Router();

 //esto es de prueba 
const { getUsers} = require('../controllers/users');

router.get('/users', getUsers); // ruta y (cb) <- con req, res

module.exports = router;