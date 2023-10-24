const {Router} = require("express");
const router = Router();

//const { getAllPokemons, getPokemonId, postPokemons, getPokemonQuery} = require('../controllers/pokemons');

router.get('/pokemons'); // ruta y (cb) <- con req, res

module.exports = router;