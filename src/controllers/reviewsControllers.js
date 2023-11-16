const axios = require("axios");
const { Review, Order, User, Product, Brand } = require("../db");
const { Op } = require("sequelize");

const STATUS_OK = 200;
const STATUS_ERROR = 500;

const getReviews = async () => {
  const allReviews = await Review.findAll({
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
      {
        model: Order,
      },
    ],
    where: {
      status: { [Op.not]: false },
    },
  });
  return allReviews;
};

const getReviewId = async (id) => {
  const ReviewById = await Review.findByPk(id, {
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
      {
        model: Order,
      },
    ],
  });
  return ReviewById;
};

const getAllReviews = async () => {
  const allReviews = await Review.findAll({
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
      {
        model: Order,
      },
    ],
  });
  return allReviews;
};

const postReview = async (comment, rating, id_user, id_product, id_order) => {
  const newReview = await Review.create({
    comment,
    rating,
    //id_user,
    //id_product,
    //id_order
  });
  await newReview.setUser(id_user);
  await newReview.setProduct(id_product);
  await newReview.setOrder(id_order);
  return newReview;
};

const editReview = async (id, comment, rating) => {
  const updateReview = await Review.update(
    {
      comment,
      rating,
    },
    { where: { id } }
  );
  return updateReview;
};

const banReview = async (id) => {
  try {
    const record = await Review.findByPk(id);
    console.log(record);
    if (!record) {
      return res.status(STATUS_ERROR).send("Registro no encontrado");
    }

    const newBanReview = !record.status;
    await Review.update({ status: newBanReview }, { where: { id } });

    const reviewUpdated = await Review.findByPk(id);

    return reviewUpdated;
  } catch (error) {
    return { error: error.message };
  }
  // try {
  //   await Review.update({ status: false }, { where: { id } });
  //   return { message: "Review softdeleted successfully" };
  // } catch (error) {
  //   return { error: error.message };
  // }
};

module.exports = {
  getReviews,
  getReviewId,
  postReview,
  editReview,
  banReview,
  getAllReviews,
};
