const {
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
} = require("../controllers/productsControllers");

const STATUS_OK = 200;
const STATUS_CREATED = 201; // Se usa avisar que se ha creado un nuevo recurso en el servidor como resultado de la solicitud. Por ejemplo, se utiliza en respuestas a solicitudes POST exitosas cuando se crea un nuevo objeto en la base de datos.
const STATUS_NO_CONTENT = 204; //Lo uso para indicar que una solicitud se ha procesado joya ;) pero no hay contenido para devolver en la respuesta.
const STATUS_ERROR = 500;

const getProductsHandler = async (req, res) => {
  const { model } = req.query;

  const result = model ? await getQueryProducts(model) : await getAllProducts();
  res.status(STATUS_OK).json(result);
};

const getProductHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getProductById(id);
    res.status(STATUS_OK).json(result);
  } catch (error) {
    res.status(STATUS_ERROR).json({ error: error.message });
  }
};

const getAllProductsHandler = async (req, res) => {
  const result = await getAllProductsList();
  res.status(STATUS_OK).json(result);
};

const getDisabledProductsHandler = async (req, res) => {
  try {
    const result = await getDisabledProducts();
    res.status(STATUS_OK).json(result);
  } catch (error) {
    res.status(STATUS_ERROR).json({ error: error.message });
  }
};

const getProductsFilterHandler = async (req, res) => {
  const { filterBy, filterValue, orderBy, orderValue } = req.query;

  const result = filterBy
    ? await getFilteredProducts(filterBy, filterValue, orderBy, orderValue)
    : await getAllProducts(orderBy, orderValue);
  res.status(STATUS_OK).json(result);
};

const postProductHandler = async (req, res) => {
  const {
    model,
    image,
    price,
    memory,
    storage,
    cpu,
    battery,
    size,
    special_features,
    id_brand,
  } = req.body;
  try {
    const result = await postProduct(
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
    );
    res.status(STATUS_CREATED).json("Producto creado exitosamente");
  } catch (error) {
    res.status(STATUS_ERROR).json({ error: error.message });
  }
};

const editProductHandler = async (req, res) => {
  const { id } = req.params;
  const {
    model,
    image,
    price,
    memory,
    storage,
    cpu,
    battery,
    size,
    special_features,
    id_brand,
  } = req.body;
  try {
    const result = await editProduct(
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
    );
    res.status(STATUS_CREATED).json(result);
  } catch (error) {
    res.status(STATUS_ERROR).json({ error: error.message });
  }
};

const deleteProductHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteProduct(id);
    res.status(STATUS_OK).json(result);
  } catch (error) {
    res.status(STATUS_ERROR).json({ error: error.message });
  }
};

const restoreProductHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await restoreProduct(id);
    res.status(STATUS_OK).json(result);
  } catch (error) {
    res.status(STATUS_ERROR).json({ error: error.message });
  }
};

module.exports = {
  getProductsHandler,
  getProductHandler,
  postProductHandler,
  editProductHandler,
  deleteProductHandler,
  getProductsFilterHandler,
  restoreProductHandler,
  getAllProductsHandler,
  getDisabledProductsHandler,
};
