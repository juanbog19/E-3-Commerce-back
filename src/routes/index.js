const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const users = require("./users.js");
const products = require("./products.js");
const orders = require("./orders.js");
const brands = require("./brands.js");
const banners = require("./banners.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/users", users);
router.use("/products", products);
router.use("/orders", orders);
router.use("/banners", banners);
router.use("/brands", brands);

module.exports = router;
