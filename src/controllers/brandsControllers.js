const axios = require("axios");
const { Brand, Product } = require("../db");
const { Op } = require("sequelize");

const getAllBrands = async () => {
  const allBrands = await Brand.findAll();
  return allBrands;
};

const getBrandById = async (id) => {
  const brandById = await Brand.findByPk(id);
  return brandById;
};

const postBrand = async (name, description, image) => {
  const newBrand = await Brand.create({
    name,
    description,
    image,
  });
  return newBrand;
};

const editBrand = async (id, name, description, image) => {
  const updateBrand = await Brand.update(
    {
      name,
      description,
      image,
    },
    { where: { id } }
  );
  return updateBrand;
};

const deleteBrand = async (id) => {
  try {
    await Brand.destroy({ where: { id } });
    return { message: "Brand deleted successfully" };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  getAllBrands,
  getBrandById,
  postBrand,
  editBrand,
  deleteBrand,
};
