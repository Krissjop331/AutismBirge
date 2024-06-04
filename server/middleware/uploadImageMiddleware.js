const multer = require('multer');
const moment = require('moment');

// Где будут загружаться и храниться
const storage = multer.diskStorage({
    destination(req, file, cb) {
        const type = req.query.type || ''; // Получаем тип изображения из параметра запроса
        const uploadPath = `stories/images/${type}/`; // Формируем путь для сохранения
        cb(null, uploadPath); // Передаем путь в мидлвар multer
    },
    filename(req, file, cb) {
        const date = moment().format('DDMMYYYY-HHmmss');
        cb(null, `${date}-${file.originalname}`);
    }
});

// Фильтрация
const fileFilter = (req, file, cb) => {
    // Если файл является картинкой
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/svg+xml') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// Размер изображения
const limits = {
    fileSize: 1048576 * 100 // 100 Мб
};

module.exports = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
});