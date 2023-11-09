const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const users = require("./users.js");
const products = require("./products.js");
const orders = require("./orders.js");
const brands = require("./brands.js");
const banners = require("./banners.js");
const auth = require("./auth.js");
const reviews = require("./reviews.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", users);
router.use("/", products);
router.use("/", orders);
router.use("/", banners);
router.use("/", brands);
router.use("/", auth);
router.use("/", reviews);

module.exports = router;
