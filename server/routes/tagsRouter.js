
const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer();
const { body, validationResult } = require('express-validator');

const checkRolesMiddleware = require("../middleware/checkRolesMiddleware.js");
const TagsController = require('../controllers/Forum/TagsController.js');

// TAGS
router.get('/', uploads.none(), TagsController.getAll);
router.get('/:id', uploads.none(), TagsController.getOne);
router.post('/create', [
    body('title')
        .isLength({min: 3}).withMessage('Заголовок не может быть меньше 3 символов')
        .notEmpty().withMessage('Это поле обязательно')
], checkRolesMiddleware(["admin"]), uploads.none(), TagsController.create);
router.put('/update/:id', [
    body('title')
        .isLength({min: 3}).withMessage('Заголовок не может быть меньше 3 символов'),
], checkRolesMiddleware(["admin"]), uploads.none(), TagsController.update);
router.delete('/delete/:id', checkRolesMiddleware(["admin"]), uploads.none(), TagsController.delete);


module.exports = router;