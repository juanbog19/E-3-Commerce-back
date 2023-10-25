const { Router } = require("express");

const {
  getOrdersHandler,
  getOrderHandler,
  postOrderHandler,
  editOrderHandler,
  deleteOrderHandler,
} = require("../handlers/ordersHandler");

const ordersRouter = Router();

const validate = (req, res, next) => {
  const { order, amount } = req.body;
  if (!order) return res.status(400).json({ error: "Falta numero de orden" });
  if (!amount) return res.status(400).json({ error: "Falta monto total" });
  next();
};

ordersRouter.get("/", getOrdersHandler);
ordersRouter.get("/:id", getOrderHandler);
ordersRouter.post("/", postOrderHandler);
ordersRouter.put("/:id", editOrderHandler);
ordersRouter.delete("/:id", deleteOrderHandler);

module.exports = ordersRouter;
