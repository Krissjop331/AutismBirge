
const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer();
const { body, validationResult } = require('express-validator');

const RoleController = require('../controllers/RoleController.js');
const checkRolesMiddleware = require("../middleware/checkRolesMiddleware.js");
const authMiddleware = require("../middleware/authMiddleware.js");


router.get('/', authMiddleware, checkRolesMiddleware(["admin"]), uploads.none(), RoleController.getAll);
router.get('/:id', authMiddleware, checkRolesMiddleware(["admin"]), uploads.none(), RoleController.getOne);
router.post('/create', [
    body('name').notEmpty().withMessage('Имя не должно быть пустым')
        .isLength({min: 3}).withMessage('Имя должно содержать как минимум 3 символа')
    ], 
    authMiddleware, 
    checkRolesMiddleware(["admin"]), 
    uploads.none(), 
    RoleController.create);
router.put('/:id', [
    body('name').isString().withMessage('Имя должно быть строкой')
], authMiddleware, checkRolesMiddleware(["admin"]), uploads.none(), RoleController.update);
router.delete('/:id', authMiddleware, checkRolesMiddleware(["admin"]), uploads.none(), RoleController.delete);

module.exports = router;