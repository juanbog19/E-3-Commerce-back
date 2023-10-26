const { Router } = require("express");
const router = Router();

const { loginUser } = require('../controllers/authControllers');

router.post('/login', loginUser);

module.exports = router;