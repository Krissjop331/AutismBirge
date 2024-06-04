const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer();

const DoctorUsersController = require("../controllers/Users/DoctorUsersController.js");
const checkRolesMiddleware = require("../middleware/checkRolesMiddleware.js");

router.get('/', checkRolesMiddleware(["admin"]), uploads.none(), DoctorUsersController.getAll);
router.get('/:id', checkRolesMiddleware(["admin"]), uploads.none(), DoctorUsersController.getId);
router.post('/create', checkRolesMiddleware(["admin"]), uploads.none(), DoctorUsersController.create);
router.put('/update/', checkRolesMiddleware(["admin"]), uploads.none(), DoctorUsersController.update);
router.delete('/delete/', checkRolesMiddleware(["admin"]), uploads.none(), DoctorUsersController.delete);
    
module.exports = router;