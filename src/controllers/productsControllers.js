const { Product, Brand } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

const getAllProducts = async () => {
  const allProducts = await Product.findAll();
  return allProducts;
};

const getProductById = async (id) => {
  const productById = await Product.findByPk(id, {
    include: {
      model: Brand,
      attributes: ["id", "name"],
    },
  });
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
  special_features,
  id_brand
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
  await newProduct.setBrand(id_brand);
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

const getQueryProducts = async (model) => {
  try {

    const trimmedModel = model.trim();
    const toLowerModel = trimmedModel.toLowerCase();
    
    if (!model || model.trim() === '') {
      return { error: "Error. La cadena de búsqueda está vacía." };
    }

    const searchDbName = await Product.findAll({
      where: {
        [Op.or]: [
          { model: toLowerModel },
          { model: { [Op.iLike]: '%' + toLowerModel + '%' } }
        ],
      },
    });

    if (searchDbName.length > 0) {
      return searchDbName;
    } else {
      return { error: "Error. No coincide con ningun registro." };
    }

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
  getQueryProducts
};
