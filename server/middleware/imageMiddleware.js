// const multer = require('multer');
// const moment = require('moment');

// // Функция для создания middleware загрузки изображений с параметрами
// const createImageUploadMiddleware = (type, required = false) => {
//     // Где будут загружаться и храниться
//     const storage = multer.diskStorage({
//         destination(req, file, cb) {
//             const uploadPath = `../stories/images/${type}/`; // Формируем путь для сохранения
//             cb(null, uploadPath); // Передаем путь в middleware multer
//         },
//         filename(req, file, cb) {
//             const date = moment().format('DDMMYYYY-HHmmss');
//             cb(null, `${date}-${file.originalname}`);
//         }
//     });

//     // Фильтрация
//     const fileFilter = (req, file, cb) => {
//         // Если файл является картинкой
//         if (file.mimetype === 'image/png' ||
//             file.mimetype === 'image/jpeg' ||
//             file.mimetype === 'image/jpg' ||
//             file.mimetype === 'image/svg+xml') {
//             cb(null, true);
//         } else {
//             cb(null, false);
//         }
//     };

//     // Размер изображения
//     const limits = {
//         fileSize: 1048576 * 100 // 100 Мб
//     };

//     return (req, res, next) => {
//         const upload = multer({
//             storage: storage,
//             fileFilter: fileFilter,
//             limits: limits
//         }).single('image');

//         // Если обязательное поле и нет файла, выдаем ошибку
//         if (required && !req.file) {
//             return res.status(400).json({ error: 'Файл не загружен' });
//         }

//         // Если файл не обязателен или файл есть, выполняем загрузку
//         if (!required || req.file) {
//             upload(req, res, function(err) {
//                 if (err instanceof multer.MulterError) {
//                     // Ошибка Multer при загрузке файла
//                     return res.status(500).json({ error: err.message });
//                 } else if (err) {
//                     // Неизвестная ошибка
//                     return res.status(500).json({ error: 'Произошла ошибка при загрузке файла' });
//                 }
//                 // Если все в порядке, переходим к следующему middleware
//                 next();
//             });
//         } else {
//             // Если файл не обязателен и его нет, просто переходим к следующему middleware
//             next();
//         }
//     };
// };

// module.exports = createImageUploadMiddleware;


const multer = require('multer');
const moment = require('moment');

// Функция для создания middleware загрузки изображений с параметрами
    const createImageUploadMiddleware = (type, required = false) => {
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

        return (req, res, next) => {
            const storage = multer.diskStorage({
                destination(req, file, cb) {
                    const uploadPath = `../client/public/stories/images/${type}/`; // Формируем путь для сохранения
                    cb(null, uploadPath); // Передаем путь в middleware multer
                },
                filename(req, file, cb) {
                    const date = moment().format('DDMMYYYY-HHmmss');
                    // cb(null, `${date}-${file.originalname}`);
                    cb(null, `${file.originalname}`);
                }
            });

            const upload = multer({
                storage: storage,
                fileFilter: fileFilter,
                limits: limits
            }).single('file');

            // Если обязательное поле и нет файла, выдаем ошибку
            if (required && !req.file) {
                return res.status(400).json({ error: 'Файл не загружен' });
            }

            // Если файл не обязателен или файл есть, выполняем загрузку
            if (!required || req.file) {
                upload(req, res, function(err) {
                    if (err instanceof multer.MulterError) {
                        // Ошибка Multer при загрузке файла
                        return res.status(500).json({ error: err.message });
                    } else if (err) {
                        // Неизвестная ошибка
                        return res.status(500).json({ error: 'Произошла ошибка при загрузке файла' });
                    }
                    // Если все в порядке, переходим к следующему middleware
                    next();
                });
            } else {
                // Если файл не обязателен и его нет, просто переходим к следующему middleware
                next();
            }
        };
    };

module.exports = createImageUploadMiddleware;