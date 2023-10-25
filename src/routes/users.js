const { Router } = require("express");
const router = Router();

//esto es de prueba 
const { getUsers, postUsers, loginUser } = require('../controllers/users');

router.get('/users', getUsers); // ruta y (cb) <- con req, res
router.post('/users', postUsers);
router.post('/login', loginUser);

module.exports = router;