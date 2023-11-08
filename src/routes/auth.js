const { Router } = require("express");
const router = Router();

const { loginUser, login, googleSignIn } = require('../controllers/authControllers');

router.post('/login', loginUser);
router.post('/test/login', login);
router.post('/auth/google', googleSignIn);

module.exports = router;