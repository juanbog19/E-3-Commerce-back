const {Product} = require ("../db.js");
const axios = require("axios");
const {Op} = require("sequelize");

const STATUS_OK = 200;
const STATUS_ERROR = 500;

const getProduct = async (req, res) => {
    try {
        const usersDb = await Product.findAll()
        return usersDb

    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
}

module.exports = {
    getProduct
}