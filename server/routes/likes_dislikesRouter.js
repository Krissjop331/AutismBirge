
const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer();
const { body } = require('express-validator');

const checkRolesMiddleware = require("../middleware/checkRolesMiddleware.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const ForumController = require('../controllers/Forum/ForumController.js');

// :id - forum_id
router.post('/:id', uploads.none(), ForumController.addLikes);
// DISLIKES
router.post('/:id', uploads.none(), ForumController.addDislikes);

module.exports = router;