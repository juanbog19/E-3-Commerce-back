const { Router } = require("express");

const {
  getBrandsHandler,
  getBrandHandler,
  postBrandHandler,
  editBrandHandler,
  deleteBrandHandler,
} = require("../handlers/brandsHandler");

const brandsRouter = Router();

const validate = (req, res, next) => {
  const { order, amount } = req.body;
  if (!order) return res.status(400).json({ error: "Falta numero de orden" });
  if (!amount) return res.status(400).json({ error: "Falta monto total" });
  next();
};

brandsRouter.get("/brands", getBrandsHandler);
brandsRouter.get("/brands/:id", getBrandHandler);
brandsRouter.post("/brands", postBrandHandler);
brandsRouter.put("/brands/:id", editBrandHandler);
brandsRouter.delete("/brands/:id", deleteBrandHandler);

module.exports = brandsRouter;
