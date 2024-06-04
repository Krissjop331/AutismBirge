    const express = require('express');
    const router = express.Router();
    const multer = require('multer');
    const uploads = multer();
    const { body, validationResult } = require('express-validator');

    const AuthController = require("../controllers/Users/AuthController.js");
    const checkRolesMiddleware = require("../middleware/checkRolesMiddleware.js");
    const authMiddleware = require("../middleware/authMiddleware.js");
    // const middlewareSingle = require('../middleware/imageMiddleware.js');
    // const middlewareImage = middlewareSingle('users', false);
    const fileMiddleware = require('../middleware/fileResourcesMiddleware');
    const filesMidle = fileMiddleware('users')


    router.post('/signin', [
        body('email')
            .isEmail().withMessage('Введите корректный адрес электронной почты')
            .isLength({min: 3}).withMessage('Заголовок не может быть меньше 3 символов'),
        body('login')
            .optional()
            .isLength({ min: 3 }).withMessage('Введите пароль не меньше 3 символов'),
        body('password')
            .notEmpty().withMessage('Это поле обязательно')
            .isLength({ min: 6 }).withMessage('Введите пароль не меньше 6 символов')
    ], uploads.none(), AuthController.signIn);

    router.post('/signup', [
        body('first_name')
            .isLength({min: 3}).withMessage('Поле не может быть меньше 3 символов')
            .notEmpty().withMessage('Это поле обязательно'),
        body('last_name')
            .isLength({min: 3}).withMessage('Поле не может быть меньше 3 символов')
            .notEmpty().withMessage('Это поле обязательно'),
        body('email')
            .isEmail().withMessage('Введите корректный адрес электронной почты')
            .isLength({min: 3}).withMessage('Поле не может быть меньше 3 символов')
            .notEmpty().withMessage('Это поле обязательно'),
        body('birthday')
            .notEmpty().withMessage('Дата рождения не должна быть пустой')
            .isDate().withMessage('Введите допустимую дату рождения')
            .toDate(),
        body("phone_number")
            .isLength({min: 10}).withMessage("Номер не может содержать меньше 10 символов"),
        body('password')
            .notEmpty().withMessage('Это поле обязательно')
            .isLength({ min: 6 }).withMessage('Введите пароль не меньше 6 символов')
    ], filesMidle, authMiddleware, checkRolesMiddleware(["admin", 'doctor', 'parents']), AuthController.signUp);

    router.get('/signout', uploads.none(), AuthController.signOut);

    // Подтверждение регистрации пользователя, казывается в параметрах состояние true или false (update user)
    // Также в параметры или через req.body нужно ввести doctor_id и parent_id (), но не обязательно
    router.put('/confirmed/:id', checkRolesMiddleware(["admin"]), uploads.none(), AuthController.confirmed);
    // Перезапись токена
    router.get('/refreshtoken', authMiddleware, uploads.none(), AuthController.refreshTokenIfActive);
    // Активен пользователь, указывается в параметрах состояние true или false
    // id берется из токена
    router.put('/isactive/', authMiddleware, uploads.none(), AuthController.isActiveUser);
    // ИЗменяем роль пользователю. Передается через параметры или body
    router.put('/role_update/:id', authMiddleware, checkRolesMiddleware(["admin"]), uploads.none(), AuthController.userRoleUpdate);

    module.exports = router; 