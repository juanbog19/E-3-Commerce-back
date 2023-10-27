const { Router } = require("express");
const productsRouter = Router();

const {
  getProductsHandler,
  getProductHandler,
  postProductHandler,
  editProductHandler,
  deleteProductHandler,
  getProductsFilterHandler,
} = require("../handlers/productsHandler");

productsRouter.get("/products", getProductsHandler); // Obtener todos los productos y con /?model=mimodelo se busca uno en especifico
productsRouter.get("/products/:id", getProductHandler); // Obtener un producto por id
productsRouter.get("/productsFilter/", getProductsFilterHandler); // Obtener productos filtrados
productsRouter.post("/products", postProductHandler); // Crear un nuevo producto
productsRouter.put("/products/:id", editProductHandler); // Actualizar un producto existente
productsRouter.delete("/products/:id", deleteProductHandler); // Eliminar producto

module.exports = productsRouter;
