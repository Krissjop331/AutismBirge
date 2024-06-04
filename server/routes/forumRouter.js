
const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer();
const { body } = require('express-validator');

const checkRolesMiddleware = require("../middleware/checkRolesMiddleware.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const ForumController = require('../controllers/Forum/ForumController.js');

router.get('/', uploads.none(), ForumController.getAll);

router.get('/:id', uploads.none(), ForumController.getOne);
router.post('/create', [
    body('title')
        .isLength({min: 3}).withMessage('Заголовок не может быть меньше 3 символов')
        .notEmpty().withMessage('Это поле обязательно'),
    body('description')
        .notEmpty().withMessage('Это поле обязательно'),
], checkRolesMiddleware(["admin"]), uploads.none(), ForumController.create);
router.put('/update/:id', [
    body('title')
        .isLength({min: 3}).withMessage('Заголовок не может быть меньше 3 символов'),
], checkRolesMiddleware(["admin"]), uploads.none(), ForumController.update);
router.delete('/delete/:id', checkRolesMiddleware(["admin"]), uploads.none(), ForumController.delete);

router.get('/featured', authMiddleware, uploads.none(), ForumController.getFeatured);
router.post('/featured/add/', authMiddleware, uploads.none(), ForumController.addFeatured);
router.delete('/featured/remove/', authMiddleware, uploads.none(), ForumController.removeFeatured);

module.exports = router;