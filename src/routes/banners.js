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

bannersRouter.get("/banners", getBannersHandler);
bannersRouter.get("/banners/:id", getBannerHandler);
bannersRouter.post("/banners", postBannerHandler);
bannersRouter.put("/banners/:id", editBannerHandler);
bannersRouter.delete("/banners/:id", deleteBannerHandler);

module.exports = bannersRouter;
