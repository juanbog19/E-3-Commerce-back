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
      where: {
        deleted: { [Op.not]: true },
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

const getAllProductsList = async () => {
  const allProducts = await Product.findAll({
    include: {
      model: Brand,
      attributes: ["id", "name"],
    },
  });
  return allProducts;
};
const getDisabledProducts = async () => {
  const allProducts = await Product.findAll({
    include: {
      model: Brand,
      attributes: ["id", "name"],
    },
    where: {
      deleted: { [Op.not]: false },
    },
  });
  return allProducts;
  // const results = await Product.findAll({
  //   include: {
  //     model: Brand,
  //     attributes: ["id", "name"],
  //   },
  //   where: {
  //     deletedAt: { [Op.not]: null },
  //   },
  //   paranoid: true,
  // });
  // return results;
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
  special_features,
  id_brand
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
      brand: {
        id: id_brand,
      },
    },
    { where: { id } }
  );
  //await updateProduct.setBrand(id_brand);
  return updateProduct;
};

const deleteProduct = async (id) => {
  try {
    await Product.update({ deleted: true }, { where: { id } });
    return { message: "Product softdeleted successfully" };
  } catch (error) {
    return { error: error.message };
  }
};

const restoreProduct = async (id) => {
  try {
    await Product.update({ deleted: false }, { where: { id } });
    return { message: "Product restored successfully" };
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
          { "$brand.name$": { [Op.iLike]: "%" + toLowerModel + "%" } }, // Buscar por nombre de marca
          { model: { [Op.iLike]: "%" + toLowerModel + "%" } }, // Buscar por nombre de producto
        ],
      },
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
      // where: {
      //   [Op.or]: [
      //     { model: toLowerModel },
      //     { model: { [Op.iLike]: "%" + toLowerModel + "%" } },
      //   ],
      // },
      // include: [
      //   {
      //     model: Brand,
      //     attributes: ["id", "name"],
      //   },
      // ],
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

const postpruebaSearchBar = async (searchString) => {
  try {
    const trimmedSearchString = searchString.trim();

    if (!searchString || trimmedSearchString === "") {
      return { error: "Error. La cadena de búsqueda está vacía." };
    }

    const searchDbName = await Product.findAll({
      where: {
        [Op.or]: [
          {
            "$brand.name$": { [Op.iLike]: "%" + trimmedSearchString + "%" },
          }, // Buscar por nombre de marca
          { model: { [Op.iLike]: "%" + trimmedSearchString + "%" } }, // Buscar por nombre de producto
        ],
      },
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
    });

    if (searchDbName.length > 0) {
      return searchDbName;
    } else {
      return { error: "Error. No coincide con ningún registro." };
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
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
    });
    return results;
  } else if (filterBy === "cpu" && orderBy === "name" && orderValue === "ZA") {
    const results = await Product.findAll({
      order: [["model", "DESC"]],
      where: {
        cpu: filterValue,
      },
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
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
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
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
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
    });
    return results;
  } else if (filterBy === "cpu") {
    const results = await Product.findAll({
      where: {
        cpu: filterValue,
      },
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
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
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
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
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
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
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
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
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
    });
    return results;
  } else if (filterBy === "memory") {
    const results = await Product.findAll({
      where: {
        memory: filterValue,
      },
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
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
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
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
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
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
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
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
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
    });
    return results;
  } else if (filterBy === "storage") {
    const results = await Product.findAll({
      where: {
        storage: filterValue,
      },
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
    });
    return results;
    // **************** SIZE ****************
  } else if (filterBy === "size" && orderBy === "name" && orderValue === "AZ") {
    const results = await Product.findAll({
      order: [["model", "ASC"]],
      where: {
        size: filterValue,
      },
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
    });
    return results;
  } else if (filterBy === "size" && orderBy === "name" && orderValue === "ZA") {
    const results = await Product.findAll({
      order: [["model", "DESC"]],
      where: {
        size: filterValue,
      },
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
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
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
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
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
    });
    return results;
  } else if (filterBy === "size") {
    const results = await Product.findAll({
      where: {
        size: filterValue,
      },
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
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

const statusProduct = async (id) => {

    const record = await Product.findByPk(id)
    if (!record) {
        return 'Registro no encontrado'
    }

    const newChangeStatus = !record.deleted
    await Product.update({ deleted: newChangeStatus }, { where: { id } })

    const productUpdated = await Product.findByPk(id)

    return productUpdated

}

module.exports = {
  getAllProducts,
  getProductById,
  postProduct,
  editProduct,
  deleteProduct,
  getQueryProducts,
  getFilteredProducts,
  restoreProduct,
  getAllProductsList,
  getDisabledProducts,
  postpruebaSearchBar,
  statusProduct
};
