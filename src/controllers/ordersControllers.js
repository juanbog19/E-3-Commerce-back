const axios = require("axios");
const { Order, User } = require("../db");
const { Op } = require("sequelize");

const getAllOrders = async () => {
  const allOrders = await Order.findAll();
  return allOrders;
};

const getOrderById = async (id) => {
  const orderById = await Order.findByPk(id, {
    include: {
      model: User,
      attributes: ["id", "username", "email"],
    },
  });
  return orderById;
};

const postOrder = async (order, amount, id_user) => {
  const newOrder = await Order.create({
    order,
    amount,
  });
  //await newOrder.setUser(id_user);
  return newOrder;
};

const editOrder = async (id, order, amount) => {
  const updateOrder = await Order.update(
    {
      order,
      amount,
    },
    { where: { id } }
  );
  return updateOrder;
};

const deleteOrder = async (id) => {
  try {
    await Order.destroy({ where: { id } });
    return { message: "Order deleted successfully" };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  postOrder,
  editOrder,
  deleteOrder,
};
