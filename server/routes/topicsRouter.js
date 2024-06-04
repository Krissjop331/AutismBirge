
const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer();
const { body, validationResult } = require('express-validator');

const checkRolesMiddleware = require("../middleware/checkRolesMiddleware.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const TopicsController = require('../controllers/Forum/TopicsController.js');

const middlewareSingle = require('../middleware/fileResourcesMiddleware.js');
const middlewareImage = middlewareSingle('forum', false);

// TOPICS
router.get('/', uploads.none(), TopicsController.getAll);
router.get('/:id', uploads.none(), TopicsController.getOne);
// :id/create/ - forum_id params
router.post('/:id/create', [
    body('title')
        .isLength({min: 3}).withMessage('Заголовок не может быть меньше 3 символов'),
    body('description')
        .isString().withMessage('Описание должно быть строкой'),
], authMiddleware, uploads.none(), TopicsController.create);
router.put(':id/update/:topics_id', [
    body('title')
        .isLength({min: 3}).withMessage('Заголовок не может быть меньше 3 символов'),
], authMiddleware, uploads.none(), TopicsController.update);
router.delete(':id/delete/:id', authMiddleware, uploads.none(), TopicsController.delete);

module.exports = router;