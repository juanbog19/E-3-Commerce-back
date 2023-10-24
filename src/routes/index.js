const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const users = require('./users.js');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", users);


module.exports = router;