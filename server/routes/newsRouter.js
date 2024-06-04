
const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer();
const { body } = require('express-validator');
const NewsController = require('../controllers/News/NewsController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRolesMiddleware = require('../middleware/checkRolesMiddleware');
const fileMiddleware = require('../middleware/fileResourcesMiddleware');

const filesMidle = fileMiddleware('news')



router.get('/', uploads.none(), NewsController.getAll);
router.get('/:id', uploads.none(), NewsController.getId);

router.post('/create', authMiddleware, checkRolesMiddleware(["admin"]), uploads.none(), NewsController.create);
router.put('/update/:id', authMiddleware, checkRolesMiddleware(["admin"]), filesMidle, NewsController.update);
router.delete('/:id', authMiddleware, checkRolesMiddleware(["admin"]), uploads.none(), NewsController.delete);
router.post('/create/:id/resources', authMiddleware, checkRolesMiddleware(['admin']), filesMidle, NewsController.createResourceNews)
router.post('/create/:id/tags', authMiddleware, checkRolesMiddleware(['admin']), uploads.none(), NewsController.createTagsNews);
router.post('/delete/:id/tags', authMiddleware, checkRolesMiddleware(['admin']), uploads.none(), NewsController.deleteTags);
router.delete('/delete/resources', authMiddleware, checkRolesMiddleware(['admin']), uploads.none(), NewsController.deleteResources);







module.exports = router;