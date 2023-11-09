const {
  getReviews,
  getReviewId,
  postReview,
  editReview,
  banReview,
} = require("../controllers/reviewsControllers");

const getReviewsHandler = async (req, res) => {
  const allReviews = await getReviews();
  res.status(200).json(allReviews);
};

const getReviewIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getReviewId(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postReviewHandler = async (req, res) => {
  const { comment, rating, id_user, id_product, id_order } = req.body;
  try {
    const newReview = await postReview(
      comment,
      rating,
      id_user,
      id_product,
      id_order
    );
    res.status(201).json({ "Review creada exitosamente": newReview });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editReviewHandler = async (req, res) => {
  const { id } = req.params;
  const { comment, rating } = req.body;
  try {
    const result = await editReview(id, comment, rating);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const banReviewHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await banReview(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getReviewsHandler,
  getReviewIdHandler,
  postReviewHandler,
  editReviewHandler,
  banReviewHandler,
};
