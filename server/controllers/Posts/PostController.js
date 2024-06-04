const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const config = require('../../config/config.json');
const secret = config.secretKey || 'JWTKEY';
const cookie = require("cookie-parser");
const moment = require('moment');

const CustomError = require('../../Errors/errors');
const db = require("../../models/index");
const User = db.User;


class PostController {

    async getAll(req, res) {
    }

    async getId(req, res) {
        
    }

    async create(req, res) {

    }

    async update(req, res) {

    }

    async delete(req, res) {

    }

}

module.exports = new PostController();