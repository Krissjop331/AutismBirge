
const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploads = multer();
const { body } = require('express-validator');
const History = require('../controllers/History_Visit/HistoryVisitController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRolesMiddleware = require('../middleware/checkRolesMiddleware');
const fileMiddleware = require('../middleware/fileResourcesMiddleware');
const filesMidle = fileMiddleware('news')


router.get('/', authMiddleware, checkRolesMiddleware(["admin"]), uploads.none(), History.getAll);
router.get('/:id', authMiddleware, checkRolesMiddleware(["admin"]), uploads.none(), History.getOneAction);
router.post('/create', authMiddleware, uploads.none(), History.create);
router.delete("/:id", authMiddleware, checkRolesMiddleware(["admin"]), uploads.none(), History.delete)
router.post('/create/action', authMiddleware, checkRolesMiddleware(["admin"]), uploads.none(), History.createActionType)

module.exports = router;