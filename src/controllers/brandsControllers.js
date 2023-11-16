const axios = require("axios");
const { Brand, Product } = require("../db");
const { Op } = require("sequelize");

const STATUS_OK = 200;
const STATUS_ERROR = 500;

const getAllBrands = async () => {
  const allBrands = await Brand.findAll({
    where: {
      deleted: { [Op.not]: true },
    },
  });
  return allBrands;
};

const getBrandById = async (id) => {
  const brandById = await Brand.findByPk(id);
  return brandById;
};

const getAllBrandsBrands = async () => {
  const allBrandsBrands = await Brand.findAll();
  return allBrandsBrands;
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
    const record = await Brand.findByPk(id);
    if (!record) {
      return res.status(STATUS_ERROR).send("Registro no encontrado");
    }

    const changeDeletedStatus = !record.deleted;
    await Brand.update({ deleted: changeDeletedStatus }, { where: { id } });

    const brandUpdated = await Brand.findByPk(id);

    return brandUpdated;
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
  getAllBrandsBrands,
};
