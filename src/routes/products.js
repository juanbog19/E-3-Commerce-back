const {Router} = require("express");
const router = Router();

const {
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
  } = require("../controllers/products");
  
  
  router.get("/products", getProduct); // Obtener todos los productos
  router.post("/products", addProduct); // Crear un nuevo producto
  router.put("/products/:id", updateProduct); // Actualizar un producto existente
  router.delete("/products/:id", deleteProduct); // Eliminar producto

module.exports = router;