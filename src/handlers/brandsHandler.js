const {
  getAllBrands,
  getBrandById,
  postBrand,
  editBrand,
  deleteBrand,
} = require("../controllers/brandsControllers");

const getBrandsHandler = async (req, res) => {
  const allBrands = await getAllBrands();
  res.status(200).json(allBrands);
};

const getBrandHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getBrandById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postBrandHandler = async (req, res) => {
  const { name, description, image } = req.body;
  try {
    const result = await postBrand(name, description, image);
    res.status(200).json("Marca creada exitosamente");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editBrandHandler = async (req, res) => {
  const { id } = req.params;
  const { name, description, image } = req.body;
  try {
    const result = await editBrand(id, name, description, image);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBrandHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteBrand(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getBrandsHandler,
  getBrandHandler,
  postBrandHandler,
  editBrandHandler,
  deleteBrandHandler,
};
