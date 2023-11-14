const { Router } = require("express");

const {
  getOrdersHandler,
  getOrderHandler,
  postOrderHandler,
  editOrderHandler,
  deleteOrderHandler,
  getOrdersFromUserHandler,
} = require("../handlers/ordersHandler");

const ordersRouter = Router();

const validate = (req, res, next) => {
  const { order, amount } = req.body;
  if (!order) return res.status(400).json({ error: "Falta numero de orden" });
  if (!amount) return res.status(400).json({ error: "Falta monto total" });
  next();
};

ordersRouter.get("/orders", getOrdersHandler);
ordersRouter.get("/orders/:id", getOrderHandler);
ordersRouter.get("/orders/user/:id", getOrdersFromUserHandler);
ordersRouter.post("/orders", validate, postOrderHandler);
ordersRouter.put("/orders/:id", editOrderHandler);
ordersRouter.delete("/orders/:id", deleteOrderHandler);

module.exports = ordersRouter;
