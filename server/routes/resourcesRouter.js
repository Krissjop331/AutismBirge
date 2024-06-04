
const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer();
const { body } = require('express-validator');

const checkRolesMiddleware = require("../middleware/checkRolesMiddleware.js");
const ResourcesController = require('../controllers/Resources/ResourcesController.js');
const middlewareSingle = require('../middleware/fileResourcesMiddleware.js');
const middlewareImage = middlewareSingle('', false);
const fileMiddleware = require('../middleware/fileResourcesMiddleware');
const filesMidle = fileMiddleware('resources',)

router.get('/', uploads.none(), ResourcesController.getAll);
router.get('/:id', uploads.none(), ResourcesController.getId);
// router.post('/create', [
//     body('title')
//         .isLength({min: 3}).withMessage('Заголовок не может быть меньше 3 символов')
//         .notEmpty().withMessage('Это поле обязательно'),
//     body('description')
//         .notEmpty().withMessage('Это поле обязательно'),
// ], checkRolesMiddleware(["admin"]), middlewareImage, ResourcesController.create);
router.post('/create', [
    body('title')
        .isLength({min: 3}).withMessage('Заголовок не может быть меньше 3 символов')
        .notEmpty().withMessage('Это поле обязательно'),
    body('description')
        .notEmpty().withMessage('Это поле обязательно'),
], checkRolesMiddleware(["admin"]), filesMidle, ResourcesController.create);
router.put('/update/:id', [
    body('title')
        .isLength({min: 3}).withMessage('Заголовок не может быть меньше 3 символов'),   
], checkRolesMiddleware(["admin"]), uploads.none(), ResourcesController.update);
router.delete('/delete/:id', checkRolesMiddleware(["admin"]), uploads.none(), ResourcesController.delete);

module.exports = router;