// const jwt = require("jsonwebtoken");
// const config = require('../config/config.json');
// const secret = config.secretKey || 'JWTKEY';

// module.exports = (req, res, next) => {

//     if (req.method === "OPTIONS") {
//         next();
//     }

//     try {
//         let token;
//         if (req.headers.authorization) {
//             token = req.headers.authorization.split(" ")[1];
//         } else {
//             return res.status(401).json({ message: "Вы не вошли в систему", status: "error" })
//         }
//         if (!token) {
//             return res.status(404).json({ message: "Вы не авторизованы" })
//         }

//         const decodedData = jwt.verify(token, secret);
//         req.user = decodedData;
//         next();

//     } catch (error) {
//         console.log(error);
//         return res.status(401).json({ message: "Ошибка на стороне сервера" });
//     }
// }

const jwt = require("jsonwebtoken");
const config = require('../config/config.json');
const secret = config.secretKey || 'JWTKEY';

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        let token;
        if (req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
        } else {
            return res.status(401).json({ message: "Вы не вошли в систему", status: "error" });
        }

        if (!token) {
            return res.status(404).json({ message: "Вы не авторизованы" });
        }

        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    req.user = jwt.decode(token); // декодируем истекший токен, чтобы получить данные пользователя
                    req.tokenExpired = true; // добавляем флаг для истекшего токена
                    return next();
                } else {
                    return res.status(401).json({ message: "Ошибка на стороне сервера", error: err.message });
                }
            } else {
                req.user = decoded;
                next();
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Ошибка на стороне сервера" });
    }
}