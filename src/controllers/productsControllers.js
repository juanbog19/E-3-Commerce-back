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
