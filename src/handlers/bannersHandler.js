const {
  getAllBanners,
  getBannerById,
  postBanner,
  editBanner,
  deleteBanner,
} = require("../controllers/bannersControllers");

const getBannersHandler = async (req, res) => {
  const allBanners = await getAllBanners();
  res.status(200).json(allBanners);
};

const getBannerHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getBannerById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postBannerHandler = async (req, res) => {
  const { name, image } = req.body;
  try {
    const result = await postBanner(name, image);
    res.status(200).json("Banner creado exitosamente");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editBannerHandler = async (req, res) => {
  const { id } = req.params;
  const { name, image } = req.body;
  try {
    const result = await editBanner(id, name, image);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBannerHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteBanner(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getBannersHandler,
  getBannerHandler,
  postBannerHandler,
  editBannerHandler,
  deleteBannerHandler,
};
