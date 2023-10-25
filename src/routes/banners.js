const { Router } = require("express");

const {
  getBannersHandler,
  getBannerHandler,
  postBannerHandler,
  editBannerHandler,
  deleteBannerHandler,
} = require("../handlers/bannersHandler");

const bannersRouter = Router();

const validate = (req, res, next) => {
  const { image } = req.body;
  if (!image) return res.status(400).json({ error: "Falta numero de orden" });
  next();
};

bannersRouter.get("/", getBannersHandler);
bannersRouter.get("/:id", getBannerHandler);
bannersRouter.post("/", postBannerHandler);
bannersRouter.put("/:id", editBannerHandler);
bannersRouter.delete("/:id", deleteBannerHandler);

module.exports = bannersRouter;
