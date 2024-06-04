const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer();

const ParentUsersController = require("../controllers/Users/ParentUsersController.js");
const checkRolesMiddleware = require("../middleware/checkRolesMiddleware.js");

router.get('/', checkRolesMiddleware(["admin"]), uploads.none(), ParentUsersController.getAll);
router.get('/:id', checkRolesMiddleware(["admin"]), uploads.none(), ParentUsersController.getId);
router.post('/create', checkRolesMiddleware(["admin"]), uploads.none(), ParentUsersController.create);
router.put('/update/', checkRolesMiddleware(["admin"]), uploads.none(), ParentUsersController.update);
router.delete('/delete/', checkRolesMiddleware(["admin"]), uploads.none(), ParentUsersController.delete);
    
module.exports = router;