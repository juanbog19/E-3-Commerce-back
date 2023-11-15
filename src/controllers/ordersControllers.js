const axios = require("axios");
const { Order, User, Product, Brand } = require("../db");
const { Op } = require("sequelize");

const getAllOrders = async () => {
  const allOrders = await Order.findAll({
    include: [
      {
        model: User,
      },
      {
        model: Product,
        include: {
          model: Brand,
        },
        through: {
          attributes: [], // Esto evita que se incluyan las columnas de la tabla intermedia
        },
      },
    ],
  });
  return allOrders;
};


const getOrderById = async (id) => {
  const orderById = await Order.findByPk(id, {
    include: [
      {
        model: User,
      },
      {
        model: Product,
        include: {
          model: Brand,
        },
      },
    ],
  });
  return orderById;
};

const getOrdersFromUser = async (id) => {
  const userOrders = await Order.findAll({
    where: {
      id_user: id,
    },
    include: [
      {
        model: User,
      },
      {
        model: Product,
        include: {
          model: Brand,
        },
      },
    ],
  });
  return userOrders;
};

const postOrder = async (order, amount, id_user, id_products) => {
  // Crear la orden con la información proporcionada
  const newOrder = await Order.create({
    order,
    amount,
  });
  // Asociar la orden al usuario
  await newOrder.setUser(id_user);

  // Asociar varios productos a la orden
  await newOrder.addProducts(id_products);

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
  getOrdersFromUser,
};
