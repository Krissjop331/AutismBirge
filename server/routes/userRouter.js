const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer();
const { body, validationResult } = require('express-validator');

const UserController = require("../controllers/Users/UserController.js");
const checkRolesMiddleware = require("../middleware/checkRolesMiddleware.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const middlewareSingle = require('../middleware/imageMiddleware.js');
const middlewareImage = middlewareSingle('users', false);

const fileMiddleware = require('../middleware/fileResourcesMiddleware');
const filesMidle = fileMiddleware('users')

router.get('/', uploads.none(), UserController.getAll);
router.get('/:id', uploads.none(), UserController.getId);
router.put('/update/', [
    body('login')
        .isString().withMessage('Login должен быть строкой'),
    body('email')
        .isString().withMessage('Email должен быть строкой')
        .isEmail().withMessage('Введите корректный адрес электронной почты'),
    body('phone_number')
        .isLength({min: 10}).withMessage('Номер не может содержать меньше 10 символов'),
    body('password')
        .isLength({min: 6}).withMessage('Пароль не может содержать меньше 6 символов'),
    body('image')
        .custom((value, { req }) => {
            const file = req.files.image;
            // Проверка типа файла
            if (!file.mimetype.startsWith('image')) {
                throw new Error('Файл должен быть изображением');
            }
            return true;
    })
], authMiddleware, filesMidle, UserController.update);
router.put('/update/admin/:id', [
    body('first_name')
        .isLength({min: 2}).withMessage("Имя не может быть меньше 2 символов"),
    body('last_name')
        .isLength({min: 2}).withMessage("Фамилия не может быть меньше 2 символов"),
    body('login')
        .isLength({min: 3}).withMessage('Пароль не может содержать меньше 3 символов'),
    body('email')
        .isEmail().withMessage('Введите корректный адрес электронной почты')
        .isLength({min: 3}).withMessage('Пароль не может содержать меньше 3 символов'),
    body('phone_number')
        .isLength({min: 10}).withMessage('Номер не может содержать меньше 10 символов'),
    body('password')
        .isLength({min: 6}).withMessage('Пароль не может содержать меньше 6 символов'),
    body('image')
        .custom((value, { req }) => {
            const file = req.files.image;
            // Проверка типа файла
            if (!file.mimetype.startsWith('image')) {
                throw new Error('Файл должен быть изображением');
            }
            return true;
    })
], authMiddleware, checkRolesMiddleware(["admin"]), middlewareImage, UserController.updateAdmin);
router.delete('/delete/:id', checkRolesMiddleware(["admin"]), uploads.none(), UserController.delete);
// router.put('/add_likes/:id', uploads.none(), UserController.addLike)
// router.put('/remove_likes/:id', uploads.none(), UserController.removeLike)
// router.put('/add_dislikes/:id', uploads.none(), UserController.addDislike)
// router.put('/remove_dislikes/:id', uploads.none(), UserController.removeDislike)
module.exports = router;
