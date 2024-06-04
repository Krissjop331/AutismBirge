
const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer();
const { body } = require('express-validator');

const checkRolesMiddleware = require("../middleware/checkRolesMiddleware.js");
const ResourcesController = require('../controllers/Resources/ResourcesController.js');

router.get('/', uploads.none(), ResourcesController.getAllTypes);
router.get('/:id', uploads.none(), ResourcesController.getType);
router.post('/create', [
    body('type')
        .isLength({min: 3}).withMessage('Тип не может быть меньше 3 символов')
        .notEmpty().withMessage('Это поле обязательно'),
], checkRolesMiddleware(["admin"]), uploads.none(), ResourcesController.createType);
router.put('/update/:id', [
    body('type')
        .isLength({min: 3}).withMessage('Тип не может быть меньше 3 символов')
], checkRolesMiddleware(["admin"]), uploads.none(), ResourcesController.updateType);
router.delete('/delete/:id', checkRolesMiddleware(["admin"]), uploads.none(), ResourcesController.deleteType);

module.exports = router;    