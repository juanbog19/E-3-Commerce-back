const { User } = require('../db.js');
const axios = require('axios');
const { Op } = require('sequelize');

const STATUS_OK = 200;
const STATUS_ERROR = 500;

const getUsers = async (req, res) => {
    try {
        const usersDb = await Users.findAll()
        return usersDb

    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
}

module.exports = {
    getUsers
}