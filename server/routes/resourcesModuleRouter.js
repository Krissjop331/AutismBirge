
const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer();
const { body } = require('express-validator');

const checkRolesMiddleware = require("../middleware/checkRolesMiddleware.js");
const ResourcesController = require('../controllers/Resources/ResourcesController.js');

router.get('/',uploads.none(), ResourcesController.getAllModules);
router.get('/:id', uploads.none(), ResourcesController.getModule);
router.post('/create/', [
    body('module')
        .isLength({min: 3}).withMessage('Модуль не может быть меньше 3 символов')
        .notEmpty().withMessage('Это поле обязательно'),
], checkRolesMiddleware(["admin"]), uploads.none(), ResourcesController.createModule);
router.put('/update/:id', [
    body('module')
        .isLength({min: 3}).withMessage('Модуль не может быть меньше 3 символов')
], checkRolesMiddleware(["admin"]), uploads.none(), ResourcesController.updateModule);
router.delete('/module/delete/:id', checkRolesMiddleware(["admin"]), uploads.none(), ResourcesController.deleteModule);

module.exports = router;