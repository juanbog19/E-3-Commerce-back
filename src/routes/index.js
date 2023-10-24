const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const pokemons = require('./pokemons.js');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", pokemons);


module.exports = router;