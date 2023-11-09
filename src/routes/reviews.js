const { Router } = require("express");
const reviewsRouter = Router();

const {
  getReviewsHandler,
  getReviewIdHandler,
  postReviewHandler,
  editReviewHandler,
  banReviewHandler,
} = require("../handlers/reviewsHandler");

reviewsRouter.get("/reviews", getReviewsHandler); // ruta y (cb) <- con req, res
reviewsRouter.get("/reviews/:id", getReviewIdHandler);
reviewsRouter.post("/reviews", postReviewHandler);
reviewsRouter.put("/reviews/:id", editReviewHandler);
reviewsRouter.delete("/reviews/:id", banReviewHandler);

module.exports = reviewsRouter;
