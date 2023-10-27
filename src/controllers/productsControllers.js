const { Product, Brand } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

const getAllProducts = async (orderBy, orderValue) => {
  if (!orderBy) {
    const allProducts = await Product.findAll({
      include: {
        model: Brand,
        attributes: ["id", "name"],
      },
    });
    return allProducts;
  } else if (orderBy === "name" && orderValue === "AZ") {
    const results = await Product.findAll({
      order: [["model", "ASC"]],
      include: {
        model: Brand,
        attributes: ["id", "name"],
      },
    });
    return results;
  } else if (orderBy === "name" && orderValue === "ZA") {
    const results = await Product.findAll({
      order: [["model", "DESC"]],
      include: {
        model: Brand,
        attributes: ["id", "name"],
      },
    });
    return results;
  } else if (orderBy === "price" && orderValue === "minMax") {
    const results = await Product.findAll({
      order: [["price", "ASC"]],
      include: {
        model: Brand,
        attributes: ["id", "name"],
      },
    });
    return results;
  } else if (orderBy === "price" && orderValue === "maxMin") {
    const results = await Product.findAll({
      order: [["price", "DESC"]],
      include: {
        model: Brand,
        attributes: ["id", "name"],
      },
    });
    return results;
  }
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

    if (!model || model.trim() === "") {
      return { error: "Error. La cadena de búsqueda está vacía." };
    }

    const searchDbName = await Product.findAll({
      where: {
        [Op.or]: [
          { model: toLowerModel },
          { model: { [Op.iLike]: "%" + toLowerModel + "%" } },
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

const getFilteredProducts = async (
  filterBy,
  filterValue,
  orderBy,
  orderValue
) => {
  if (!filterValue) {
    return "Seleccione un valor del filtro";
    // **************** CPU ****************
  } else if (filterBy === "cpu" && orderBy === "name" && orderValue === "AZ") {
    const results = await Product.findAll({
      order: [["model", "ASC"]],
      where: {
        cpu: filterValue,
      },
    });
    return results;
  } else if (filterBy === "cpu" && orderBy === "name" && orderValue === "ZA") {
    const results = await Product.findAll({
      order: [["model", "DESC"]],
      where: {
        cpu: filterValue,
      },
    });
    return results;
  } else if (
    filterBy === "cpu" &&
    orderBy === "price" &&
    orderValue === "minMax"
  ) {
    const results = await Product.findAll({
      order: [["price", "ASC"]],
      where: {
        cpu: filterValue,
      },
    });
    return results;
  } else if (
    filterBy === "cpu" &&
    orderBy === "price" &&
    orderValue === "maxMin"
  ) {
    const results = await Product.findAll({
      order: [["price", "DESC"]],
      where: {
        cpu: filterValue,
      },
    });
    return results;
  } else if (filterBy === "cpu") {
    const results = await Product.findAll({
      where: {
        cpu: filterValue,
      },
    });
    return results;
    // **************** MEMORY ****************
  } else if (
    filterBy === "memory" &&
    orderBy === "name" &&
    orderValue === "AZ"
  ) {
    const results = await Product.findAll({
      order: [["model", "ASC"]],
      where: {
        memory: filterValue,
      },
    });
    return results;
  } else if (
    filterBy === "memory" &&
    orderBy === "name" &&
    orderValue === "ZA"
  ) {
    const results = await Product.findAll({
      order: [["model", "DESC"]],
      where: {
        memory: filterValue,
      },
    });
    return results;
  } else if (
    filterBy === "memory" &&
    orderBy === "price" &&
    orderValue === "minMax"
  ) {
    const results = await Product.findAll({
      order: [["price", "ASC"]],
      where: {
        memory: filterValue,
      },
    });
    return results;
  } else if (
    filterBy === "memory" &&
    orderBy === "price" &&
    orderValue === "maxMin"
  ) {
    const results = await Product.findAll({
      order: [["price", "DESC"]],
      where: {
        memory: filterValue,
      },
    });
    return results;
  } else if (filterBy === "memory") {
    const results = await Product.findAll({
      where: {
        memory: filterValue,
      },
    });
    return results;
    // **************** STORAGE ****************
  } else if (
    filterBy === "storage" &&
    orderBy === "name" &&
    orderValue === "AZ"
  ) {
    const results = await Product.findAll({
      order: [["model", "ASC"]],
      where: {
        storage: filterValue,
      },
    });
    return results;
  } else if (
    filterBy === "storage" &&
    orderBy === "name" &&
    orderValue === "ZA"
  ) {
    const results = await Product.findAll({
      order: [["model", "DESC"]],
      where: {
        storage: filterValue,
      },
    });
    return results;
  } else if (
    filterBy === "storage" &&
    orderBy === "price" &&
    orderValue === "minMax"
  ) {
    const results = await Product.findAll({
      order: [["price", "ASC"]],
      where: {
        storage: filterValue,
      },
    });
    return results;
  } else if (
    filterBy === "storage" &&
    orderBy === "price" &&
    orderValue === "maxMin"
  ) {
    const results = await Product.findAll({
      order: [["price", "DESC"]],
      where: {
        storage: filterValue,
      },
    });
    return results;
  } else if (filterBy === "storage") {
    const results = await Product.findAll({
      where: {
        storage: filterValue,
      },
    });
    return results;
    // **************** SIZE ****************
  } else if (filterBy === "size" && orderBy === "name" && orderValue === "AZ") {
    const results = await Product.findAll({
      order: [["model", "ASC"]],
      where: {
        size: filterValue,
      },
    });
    return results;
  } else if (filterBy === "size" && orderBy === "name" && orderValue === "ZA") {
    const results = await Product.findAll({
      order: [["model", "DESC"]],
      where: {
        size: filterValue,
      },
    });
    return results;
  } else if (
    filterBy === "size" &&
    orderBy === "price" &&
    orderValue === "minMax"
  ) {
    const results = await Product.findAll({
      order: [["price", "ASC"]],
      where: {
        size: filterValue,
      },
    });
    return results;
  } else if (
    filterBy === "size" &&
    orderBy === "price" &&
    orderValue === "maxMin"
  ) {
    const results = await Product.findAll({
      order: [["price", "DESC"]],
      where: {
        size: filterValue,
      },
    });
    return results;
  } else if (filterBy === "size") {
    const results = await Product.findAll({
      where: {
        size: filterValue,
      },
    });
    return results;
    // **************** BRAND ****************
  } else if (
    filterBy === "brand" &&
    orderBy === "name" &&
    orderValue === "AZ"
  ) {
    const results = await Product.findAll({
      order: [["model", "ASC"]],
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
          where: {
            name: filterValue,
          },
        },
      ],
    });
    return results;
  } else if (
    filterBy === "brand" &&
    orderBy === "name" &&
    orderValue === "ZA"
  ) {
    const results = await Product.findAll({
      order: [["model", "DESC"]],
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
          where: {
            name: filterValue,
          },
        },
      ],
    });
    return results;
  } else if (
    filterBy === "brand" &&
    orderBy === "price" &&
    orderValue === "minMax"
  ) {
    const results = await Product.findAll({
      order: [["price", "ASC"]],
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
          where: {
            name: filterValue,
          },
        },
      ],
    });
    return results;
  } else if (
    filterBy === "brand" &&
    orderBy === "price" &&
    orderValue === "maxMin"
  ) {
    const results = await Product.findAll({
      order: [["price", "DESC"]],
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
          where: {
            name: filterValue,
          },
        },
      ],
    });
    return results;
  } else if (filterBy === "brand") {
    const results = await Product.findAll({
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
          where: {
            name: filterValue,
          },
        },
      ],
    });
    //console.log(results);
    return results;
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  editProduct,
  deleteProduct,
  getQueryProducts,
  getFilteredProducts,
};
