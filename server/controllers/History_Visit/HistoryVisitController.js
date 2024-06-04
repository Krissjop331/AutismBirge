const CustomError = require('../../Errors/errors');
const db = require('../../models/index');
const Role = db.Role;
const ActionType = db.ActionType;
const HistoryVisit = db.HistoryVisit;
const User = db.User;

const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require('../../config/config.json');
const secret = config.secretKey || 'JWTKEY';


class HistoryVisitController {

    async getAll(req, res) {
        try {
            const authToken = req.headers.authorization.split(" ")[1] || '';
            if (!req.body || !req.params) {
                return CustomError.handleNotFound(res, "Вы не авторизованы", 400);
            }
            if (authToken) {
                const { id } = jwt.verify(authToken, secret);
                const user = await User.findOne({
                    where: { id: id },
                    include: [{
                        model: Role
                    }]
                });
    
                // Получение параметров фильтрации из запроса
                const { user_id, action_type_id } = req.query;
    
                // Создание объекта фильтрации для использования в секции where
                const filter = {};
                if (user_id) filter.user_id = user_id;
                if (action_type_id) filter.type = action_type_id;
    
                const history = await HistoryVisit.findAll({
                    where: filter,
                    include: [
                        {
                            model: User
                        }
                    ]
                });
    
                if (!history || (Array.isArray(history) && history.length === 0)) {
                    return res.status(200).json({ message: "Историй нет", history });
                }
    
                return res.status(200).json({ message: "Истории получены", history });
            } else {
                return res.status(403).json({ message: "Вы не авторизованы", status: 403 });
            }
        } catch (e) {
            console.error(`Ошибка извлечения ролей: ${e.message}`);
            return CustomError.handleInternalServerError(res, "Ошибка на сервере", 500);
        }
    }

    async getOneAction(req, res) {
        const {id} = req.params;
        if(!id) return CustomError.handleBadRequest(res, "Тип не передан")
        
        const action_type = await ActionType.findOne({where: {id}})
        return res.status(200).json({message: "Получен тип", action_type})
    }
    
    async create(req, res) {
        try {
            const authToken = req.headers.authorization.split(" ")[1] || '';
            if (!req.body || !req.params) {
                return CustomError.handleNotFound(res, "Вы не авторизованы", 400);
            }
            if(authToken !== '' || authToken != undefined) {
                const { id } = jwt.verify(authToken, secret);
                const user = await User.findOne({
                    where: {id: id},
                    include: [{
                        model: Role
                }]});

                const type = req.body.type || req.params.type;
                if(!type) {
                    return CustomError.handleNotFound(res, "Вы не передали тип типа истории", 400);
                }
                // const history_type = await ActionType.findOne({where: {id: type_id}})
                // if(!history_type) return CustomError.handleNotFound(res, "Тип не найден");

                let history = await HistoryVisit.create({
                    user_id: user.id,
                    type,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })

                return res.status(200).json({message: "История добавлена", history})
            } else {
                return res.status(403).json({ message: "Вы не авторизованы", status: 403});
            }
        } catch (e) {
            console.error(`Ошибка: ${e.message}`);
            return CustomError.handleInternalServerError(res, "Ошибка на сервере", 500);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return CustomError.handleNotFound(res, "Идентификатор роли не предоставлен", 404);
            }

            const history = await HistoryVisit.findOne({where: {id: id}});
            if (!history) {
                return CustomError.handleNotFound(res, "Роль не найдена", 404);
            }
            history.destroy();

            await history.destroy();
            return res.status(200).json({ message: "История успешно удалена", status: 201 })
        } catch (error) {
            console.error("Ошибка при обновлении данных роли:", error);
            return CustomError.handleInternalServerError(res, "Ошибка при обновлении данных роли");
        }
    }

    async createActionType(req, res) {
        const {title} = req.body || req.params;
        if(!title) return CustomError.handleBadRequest(res, "Данные не переданы") 

        const action_type = await ActionType.create({
            title,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        if(!action_type) return CustomError.handleBadRequest(res, "Не удалось добавить тип истории")
        
        return res.status(200).json({message: "Добавлен тип", action_type})
    }
}

module.exports = new HistoryVisitController();