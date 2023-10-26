const { Router } = require("express");
const productsRouter = Router();

const {
  getProductsHandler,
  getProductHandler,
  postProductHandler,
  editProductHandler,
  deleteProductHandler,
} = require("../handlers/productsHandler");

productsRouter.get("/", getProductsHandler); // Obtener todos los productos
productsRouter.get("/:id", getProductHandler); // Obtener todos los productos
productsRouter.post("/", postProductHandler); // Crear un nuevo producto
productsRouter.put("/:id", editProductHandler); // Actualizar un producto existente
productsRouter.delete("/:id", deleteProductHandler); // Eliminar producto

module.exports = productsRouter;
