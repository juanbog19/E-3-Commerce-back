const {
  getAllOrders,
  getOrderById,
  postOrder,
  editOrder,
  deleteOrder,
  getOrdersFromUser,
} = require("../controllers/ordersControllers");

const getOrdersHandler = async (req, res) => {
  const allOrders = await getAllOrders();
  res.status(200).json(allOrders);
};

const getOrderHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getOrderById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrdersFromUserHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getOrdersFromUser(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postOrderHandler = async (req, res) => {
  const { order, amount, id_user, id_products } = req.body;

  console.log(id_user)
  try {
    const newOrder = await postOrder(order, amount, id_user, id_products);
    res.status(201).json({ "Orden creada exitosamente": newOrder });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editOrderHandler = async (req, res) => {
  const { id } = req.params;
  const { order, amount } = req.body;
  try {
    const result = await editOrder(id, order, amount);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteOrderHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteOrder(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getOrdersHandler,
  getOrderHandler,
  postOrderHandler,
  editOrderHandler,
  deleteOrderHandler,
  getOrdersFromUserHandler,
};
