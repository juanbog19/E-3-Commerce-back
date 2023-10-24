const {Router} = require("express");
const router = Router();

const { getUsers} = require('../controllers/users');

router.get('/users', getUsers); // ruta y (cb) <- con req, res

module.exports = router;