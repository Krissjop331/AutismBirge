const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const secret = config.secretKey || 'JWTKEY';

const db = require('../models/index');
const User = db.User;

module.exports = (allowedRoles) => {
    return (req, res, next) => {
        if (req.method === "OPTIONS") {
            next();
            return; // Добавьте возврат, чтобы избежать дальнейшего выполнения кода
        }

        try {
            let token;

            if (req.headers.authorization) {
                token = req.headers.authorization.split(' ')[1];
                const { id } = jwt.verify(token, secret);

                User.findByPk(id)
                    .then(user => {
                        if (!user) {
                            return res.status(404).json({ message: "Пользователь не найден", status: "error" });
                        }

                        const decodedToken = jwt.verify(token, secret);
                        if (!decodedToken.roles) {
                            return res.status(403).json({ message: "У вас нет доступа", status: "lock" });
                        }

                        // Проверяем, имеет ли пользователь хотя бы одну из разрешенных ролей
                        const userRoles = decodedToken.roles.split(',');
                        const hasAccess = userRoles.some(role => allowedRoles.includes(role));
                        if (!hasAccess) {
                            return res.status(403).json({ message: "У вас нет доступа", status: "error" });
                        }

                        next();
                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(404).json({ message: "Пользователь не найден", status: "error" });
                    });
            } else {
                return res.status(403).json({ message: "Вы не авторизованы", status: "error" });
            }
        } catch (error) {
            console.log(error);
            return res.status(401).json({ message: "Неверный токен", status: "error" });
        }
    };
};