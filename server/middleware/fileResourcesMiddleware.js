const multer = require('multer');
const moment = require('moment');

// Функция для создания мидлвара загрузки изображений с параметрами
const fileResourcesMiddleware = (type, required = false) => {
    // Где будут загружаться и храниться
    const storage = multer.diskStorage({
        destination(req, file, cb) {
            // const uploadPath = `../stories/files/resources/${type}/`; 
            const uploadPath = `../client/public/stories/files/resources/${type}/`; 
            cb(null, uploadPath); 
        },
        filename(req, file, cb) {
            const date = moment().format('DDMMYYYY-HHmmss');
            cb(null, `${file.originalname}`);
        }
    });

    // Фильтрация
    const fileFilter = (req, file, cb) => {
        if ([
            'text/xml',
            'application/msword', // Для старых версий DOC
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Для DOCX
            'application/pdf',
            'application/vnd.ms-excel', // Для старых версий XLS
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Для XLSX
            'application/vnd.ms-powerpoint', // Для старых версий PPT
            'application/vnd.openxmlformats-officedocument.presentationml.presentation', // Для PPTX
            'text/plain',
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/svg+xml',
            'video/mp4',
            'video/avi',
            'video/mpeg',
            'video/quicktime',
            'video/webm'
        ].includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Неподдерживаемый тип файла'), false);
        }
    };


    const limits = {
        fileSize: 1048576 * 1000
    };

    return (req, res, next) => {
        const upload = multer({
            storage: storage,
            fileFilter: fileFilter,
            limits: limits
        }).single('file');

        // Если обязательное поле и нет файла, выдаем ошибку
        if (required && !req.file) {
            return res.status(400).json({ error: 'Файл не загружен' });
        }

        if (!required || req.file) {
            upload(req, res, function(err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).json({ error: err.message });
                } else if (err) {
                    // Неизвестная ошибка
                    return res.status(500).json({ error: 'Произошла ошибка при загрузке файла: ', err});
                }
                next();
            });
        } else {
            next();
        }
    };

    // return (req, res, next) => {
    //     if (!req.file) { 
    //         next();
    //     } else {
    //         multer({
    //             storage: storage,
    //             fileFilter: fileFilter,
    //             limits: limits
    //         }).single('file')(req, res, next);
    //     }
    // };
};

module.exports = fileResourcesMiddleware;