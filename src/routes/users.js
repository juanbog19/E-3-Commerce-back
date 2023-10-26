const { Router } = require("express");
const router = Router();

const { getUsers, getUserId, postUsers, editUser } = require('../controllers/usersControllers');

router.get('/users', getUsers); // ruta y (cb) <- con req, res
router.get('/users/:id', getUserId);
router.post('/users', postUsers);
router.put('/users/:id', editUser);

module.exports = router;