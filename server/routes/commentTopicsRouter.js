
const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer();
const { body, validationResult } = require('express-validator');

const checkRolesMiddleware = require("../middleware/checkRolesMiddleware.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const TopicsController = require('../controllers/Forum/TopicsController.js');

const fileMiddleware = require('../middleware/fileResourcesMiddleware');
const filesMidle = fileMiddleware('forum')

// COMMENT
// :id - topics_id
router.get('/:id/comments/', uploads.none(), TopicsController.getAllComment);
router.get('/:id/comments/:comment_id', uploads.none(), TopicsController.getOneComment);
router.post('/:id/comments/create/', [
    body('content')
        .isLength({min: 3}).withMessage('Текст не может быть меньше 3 символов')
        .notEmpty().withMessage('Это поле обязательно'),
], authMiddleware, filesMidle, TopicsController.createComment);
router.delete('/:id/comments/delete/:comment_id', authMiddleware , checkRolesMiddleware(["admin"]), TopicsController.deleteComment);

module.exports = router;