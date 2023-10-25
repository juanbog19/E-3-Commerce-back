const axios = require("axios");
const { Banner } = require("../db");
const { Op } = require("sequelize");

const getAllBanners = async () => {
  const allBanners = await Banner.findAll();
  return allBanners;
};

const getBannerById = async (id) => {
  const bannerById = await Banner.findByPk();
  return bannerById;
};

const postBanner = async (name, image) => {
  const newBanner = await Banner.create({
    name,
    image,
  });
  return newBanner;
};

const editBanner = async (id, name, image) => {
  const updateBanner = await Banner.update(
    {
      name,
      image,
    },
    { where: { id } }
  );
  return updateBanner;
};

const deleteBanner = async (id) => {
  try {
    await Banner.destroy({ where: { id } });
    return { message: "Banner deleted successfully" };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  getAllBanners,
  getBannerById,
  postBanner,
  editBanner,
  deleteBanner,
};
