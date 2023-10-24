const {Router} = require("express");
const router = Router();

const {getProduct} = require("../controllers/products");

router.get("/products", getProduct); // ruta y (cb) <- con req, res

module.exports = router;