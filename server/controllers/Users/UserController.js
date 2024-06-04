const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const config = require('../../config/config.json');
const secret = config.secretKey || 'JWTKEY';

const CustomError = require('../../Errors/errors');
const db = require("../../models/index");
const User = db.User;
const Role = db.Role;
// const Likes = db.Likes;
// const Dislikes = db.Dislikes;


class UserController {

    async getAll(req, res) {
        try {
            const users = await User.findAll({
                include: [
                    {
                        model: Role
                    }
                ]   
            });
            return users.length > 0 ? 
                res.status(201).json({status: 201, message: "Пользователи получены", users: users}) :
                CustomError.handleNotFound(res, "Пользователей нет", 404);
        } catch (e) {
            console.error(`Ошибка получения пользователей: ${e.message}`);
            CustomError.handleInternalServerError(res, "Ошибка на сервере", 500);
        }
    }
    
    async getId(req, res) {
        try{
            const {id} = req.params || req.body || req.query;

            const user = await User.findOne({where: {id}, include: [{model: Role}]})
            if(!user) {
                return CustomError.handleNotFound(res, "Пользователь не найден", 404);
            }

            return res.status(200).json({message: "Пользователь найден", users: user, status: 200});
        } catch (e) {
            console.error(`Ошибка получения пользователя: ${e.message}`);
            CustomError.handleInternalServerError(res, "Ошибка на сервере", 500);
        }
    }

    async update(req, res) {
        try {

            if(!req.body) {
                return CustomError.handleNotFound(res, "Данных нет", 400);
            }
            if(!req.headers.authorization) return res.status(403).json({message: "Некорректно передан токен либо не передан"})

            const authToken = req.headers.authorization.split(' ')[1];
            let { id } = jwt.verify(authToken, secret);
            const userVerify = await User.findOne({where: {id: id}})

            const user = await User.findOne({where: {id}, include: [{model: Role}]});
            if(!user) {
                return CustomError.handleNotFound(res, "Пользователь не найден", 404);
            }
            if(user.id !== userVerify.id) {
                return res.status(403).json({message: "Вы не являетесь этим пользователем", status: 403})
            }

            user.login = req.body.login || req.params.login || user.login;
            user.email = req.body.email || req.params.email || user.email;
            user.birthday = req.body.birthday || user.birthday
            user.phone_number = req.body.phone || req.params.phone || req.params.phone_number || req.body.phone_number || user.phone_number;
            await user.save();

            if(req.body.password) {
                user.password = bcrypt.hashSync(req.body.password || req.params.password, 8);
                await user.save();
            } else if(req.file) {
                user.avatar_url = req.file?.path.replace(/\\/g, "/") || req.body.file?.path || '';
                await user.save();
            }

            return res.status(200).json({message: "Данные обновлены", user, status: 201, body: req.body});
        } catch (error) {
            console.error(`Ошибка обновления: ${error.message}`);
            CustomError.handleInternalServerError(res, "Ошибка на сервере", 500);
        }
    }

    // Все поля пользователя может редактировать лишь админ
    async updateAdmin(req, res) {
        try {

            let id;
            if (req.params && req.params.id) {
                id = req.params.id;
            } else if (req.body && req.body.id) {
                id = req.body.id;
            } else if (req.query && req.query.id) {
                id = req.query.id;
            } else {
                return CustomError.handleNotFound(res, "ID пользователя не указан", 400);
            }
        
            if(!req.body) {
                return CustomError.handleNotFound(res, "Данных нет", 400);
            }
        
            const user = await User.findOne({where: {id}, include: [{model: Role}]});
            if(!user) {
                return CustomError.handleNotFound(res, "Пользователь не найден", 404);
            }
        
            user.first_name = req.body.first_name || user.first_name;
            user.last_name = req.body.last_name || user.last_name;
            user.email = req.body.email || user.email;
            user.login = req.body.login || user.login;
            user.birthday = req.body.birthday || user.birthday
            // user.avatar_url = req.file?.path || ''; // Добавил проверку на наличие файла в body
            user.phone_number = req.body.phone || user.phone_number;
            user.status = req.body.status || user.status;
            user.blocked = req.body.blocked || user.blocked;
            user.role_id = req.body.role_id || user.role_id;
            await user.save();
    
            if(req.body.password) {
                user.password = bcrypt.hashSync(req.body.password, 8);
                await user.save();
            } 
            if (req.file) {
                // user.avatar_url = req.file.path.replace(/\\/g, "/") || '';
                user.avatar_url = req.file?.path.replace(/\\/g, "/") || req.body.file?.path || '';
            }
        
            return res.status(200).json({message: "Данные обновлены", user, user_Id: user.id, status: 201})
        } catch (e) {
            console.error(`Ошибка изменения пользователя адином: ${e.message}`);
            CustomError.handleInternalServerError(res, "Ошибка на сервере", 500);
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params || req.body;
            if(!id) return CustomError.handleInvalidData(res, "Не передан id пользователя");

            const user = await User.findByPk(id);
            if (!user) {
                return CustomError.handleNotFound(res, "Пользователь не найден", 404);
            }

            await user.destroy();
            return res.status(200).json({ message: "Пользователь успешно удалена", status: 201 })
        } catch (e) {
            console.error(`Ошибка удаления пользователя: ${e.message}`);
            CustomError.handleInternalServerError(res, "Ошибка на сервере", 500);
        }
    }


    // async addLike(req, res) {
    //     try {
    //         const authToken = req.headers.authorization.split(' ')[1];
    //         const token = jwt.verify(authToken, secret);
    //         const user = await User.findOne({ where: { id: token.id } }); // Получаем пользователя по токену
    
    //         const likedUserId = req.params.userId; // Получаем ID пользователя, которому ставят лайк
    
    //         const existingLike = await Likes.findOne({
    //             where: {
    //                 liked_user_id: likedUserId,
    //                 user_id: user.id // Проверяем, если пользователь уже ставил лайк данному пользователю
    //             }
    //         });
    
    //         if (existingLike) {
    //             return res.status(400).json({ status: 400, message: "Лайк уже был поставлен" });
    //         }
    
    //         await Likes.create({
    //             liked_user_id: likedUserId,
    //             user_id: user.id,
    //             status: true // Устанавливаем статус лайка как активный
    //         });
    
    //         return res.status(200).json({ status: 200, message: "Лайк добавлен успешно" });
    //     } catch (error) {
    //         console.error(`Ошибка добавления лайка: ${error.message}`);
    //         return res.status(500).json({ status: 500, message: "Ошибка на сервере" });
    //     }
    // }
    
    // async removeLike(req, res) {
    //     try {
    //         const authToken = req.headers.authorization.split(' ')[1];
    //         const token = jwt.verify(authToken, secret);
    //         const user = await User.findOne({ where: { id: token.id } }); // Получаем пользователя по токену
    
    //         const likedUserId = req.params.userId; // Получаем ID пользователя, которому ставят лайк
    
    //         const existingLike = await Likes.findOne({
    //             where: {
    //                 liked_user_id: likedUserId,
    //                 user_id: user.id // Проверяем, если пользователь уже ставил лайк данному пользователю
    //             }
    //         });
    
    //         if (!existingLike) {
    //             return res.status(404).json({ status: 404, message: "Лайк не найден" });
    //         }
    
    //         await existingLike.destroy(); // Удаляем лайк
    
    //         return res.status(200).json({ status: 200, message: "Лайк удален успешно" });
    //     } catch (error) {
    //         console.error(`Ошибка удаления лайка: ${error.message}`);
    //         return res.status(500).json({ status: 500, message: "Ошибка на сервере" });
    //     }
    // }

    // async addDislike(req, res) {
    //     try {
    //         const authToken = req.headers.authorization.split(' ')[1];
    //         const token = jwt.verify(authToken, secret);
    //         const user = await User.findOne({ where: { id: token.id } }); // Получаем пользователя по токену
    
    //         const dislikedUserId = req.params.userId; // Получаем ID пользователя, которому ставят лайк
    
    //         const existingDislike = await Dislikes.findOne({
    //             where: {
    //                 disliked_user_id: dislikedUserId,
    //                 user_id: user.id // Проверяем, если пользователь уже ставил лайк данному пользователю
    //             }
    //         });
    
    //         if (existingDislike) {
    //             return res.status(400).json({ status: 400, message: "Лайк уже был поставлен" });
    //         }
    
    //         await Dislikes.create({
    //             disliked_user_id: dislikedUserId,
    //             user_id: user.id,
    //             status: true // Устанавливаем статус лайка как активный
    //         });
    
    //         return res.status(200).json({ status: 200, message: "Дизлайк добавлен успешно", user });
    //     } catch (error) {
    //         console.error(`Ошибка добавления лайка: ${error.message}`);
    //         return res.status(500).json({ status: 500, message: "Ошибка на сервере" });
    //     }
    // }

    // async removeDislike(req, res) {
    //     try {
    //         const authToken = req.headers.authorization.split(' ')[1];
    //         const token = jwt.verify(authToken, secret);
    //         const user = await User.findOne({ where: { id: token.id } }); // Получаем пользователя по токену
    
    //         const dislikedUserId = req.params.userId; // Получаем ID пользователя, которому ставят лайк
    
    //         const existingDislike = await Dislikes.findOne({
    //             where: {
    //                 disliked_user_id: dislikedUserId,
    //                 user_id: user.id // Проверяем, если пользователь уже ставил лайк данному пользователю
    //             }
    //         });
    
    //         if (!existingDislike) {
    //             return res.status(404).json({ status: 404, message: "Дизлайк не найден" });
    //         }
    
    //         await existingDislike.destroy(); // Удаляем лайк
    
    //         return res.status(200).json({ status: 200, message: "Дизлайк удален успешно", user });
    //     } catch (error) {
    //         console.error(`Ошибка удаления лайка: ${error.message}`);
    //         return res.status(500).json({ status: 500, message: "Ошибка на сервере" });
    //     }
    // }

}

module.exports = new UserController();