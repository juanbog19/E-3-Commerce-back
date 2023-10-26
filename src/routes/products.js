const {Router} = require("express");
const router = Router();

const {getProduct} = require("../controllers/productsControllers");

router.get("/products", getProduct); // ruta y (cb) <- con req, res

module.exports = router;