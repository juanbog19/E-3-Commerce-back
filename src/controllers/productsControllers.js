<<<<<<< HEAD
const { Product } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

const getAllProducts = async () => {
  const allProducts = await Product.findAll();
  return allProducts;
};

const getProductById = async (id) => {
  const productById = await Product.findByPk(id);
  return productById;
};

const postProduct = async (
  model,
  image,
  price,
  memory,
  storage,
  cpu,
  battery,
  size,
  special_features
) => {
  const newProduct = await Product.create({
    model,
    image,
    price,
    memory,
    storage,
    cpu,
    battery,
    size,
    special_features,
  });
  return newProduct;
};

const editProduct = async (
  id,
  model,
  image,
  price,
  memory,
  storage,
  cpu,
  battery,
  size,
  special_features
) => {
  const updateProduct = await Product.update(
    {
      model,
      image,
      price,
      memory,
      storage,
      cpu,
      battery,
      size,
      special_features,
    },
    { where: { id } }
  );
  return updateProduct;
};

const deleteProduct = async (id) => {
  try {
    await Product.destroy({ where: { id } });
    return { message: "Product deleted successfully" };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  editProduct,
  deleteProduct,
};
=======
const {Product} = require ("../db.js");
const axios = require("axios");
const {Op} = require("sequelize");

const STATUS_OK = 200;
const STATUS_ERROR = 500;

const getProduct = async (req, res) => {
    try {
        const products = await Product.findAll()
        
        res.status(STATUS_OK).json(products);     
    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
}

module.exports = {
    getProduct
}
>>>>>>> 1782fdd834d28dea88603e49afa0fa18c8c5e1a3
