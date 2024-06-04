
const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer();
const { body } = require('express-validator');
const ArticlesController = require('../controllers/Articles/ArticlesController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRolesMiddleware = require('../middleware/checkRolesMiddleware');
const fileMiddleware = require('../middleware/fileResourcesMiddleware');
const filesMidle = fileMiddleware('news')


router.get('/', uploads.none(), ArticlesController.getAll);
router.get('/:id', uploads.none(), ArticlesController.getId);
router.post('/create', authMiddleware, checkRolesMiddleware(["admin"]), uploads.none(), ArticlesController.create);
router.delete('/:id', authMiddleware, checkRolesMiddleware(["admin"]), uploads.none(), ArticlesController.delete);

module.exports = router;