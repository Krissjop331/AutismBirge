const CustomError = require('../Errors/errors');
const db = require('../models/index');
const Role = db.Role;
const { validationResult } = require("express-validator");


class RoleController {

    async getAll(req, res) {
        try {
            const role = await Role.findAll();
            return role.length > 0 ? 
                res.status(201).json({status: 201, message: "Роли получены", roles: role}) :
                CustomError.handleInvalidData(res, "Ролей нет", 201);
        } catch (e) {
            console.error(`Ошибка извеления ролей: ${e.message}`);
            CustomError.handleInternalServerError(res, "Ошибка на сервере", 500);
        }
    }

    async getOne(req, res) {
        try {
            const {id} = req.params || req.body || req.query;
            if(id === undefined && id == null && !id && id == '') {
                return CustomError.handleNotFound(res, "Роли не существует", 404);
            }

            const role = await Role.findOne({id: id});
            if(!role) {
                return CustomError.handleNotFound(res, "Роль не найдена", 404);
            }

            return res.status(200).json({status: 201, message: "Роль найдена", roles: role})
        } catch (error) {
            console.error(`Ошибка извеления роли: ${e.message}`);
            CustomError.handleInternalServerError(res, "Ошибка на сервере", 500);
        }
    }

    async create(req, res) {
        try {
            const { name } = req.body;
            if (!name) {
                return CustomError.handleNotFound(res, "Данных нет", 400); // Изменено на статус 400
            }

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
    
            const existingRole = await Role.findOne({ where: { name } });
            if (existingRole) {
                return CustomError.handleDuplicateResource(res, "Данная роль уже существует", 409);
            }
            const newRole = await Role.create({ name });
            if (!newRole) {
                return CustomError.handleInternalServerError(res, "Ошибка на сервере", 500);
            }

            return res.status(201).json({ status: 201, message: "Роль успешно создана", role: newRole });
        } catch (error) {
            console.error("Ошибка при создании роли:", error);
            return CustomError.handleInternalServerError(res, "Ошибка на сервере", 500);
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params || req.body || req.query;
            if (!id) {
                return CustomError.handleNotFound(res, "Идентификатор роли не предоставлен", 404);
            }
    
            const role = await Role.findByPk(id);
            if (!role) {
                return CustomError.handleNotFound(res, "Роль не найдена", 404);
            }

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            role.name = req.body.name || role.name;
            await role.save();
    
            return res.status(200).json({ message: "Данные успешно обновлены", status: 200, role });
        } catch (error) {
            console.error("Ошибка при обновлении данных роли:", error);
            return CustomError.handleInternalServerError(res, "Ошибка при обновлении данных роли");
        }
    }
    

    async delete(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return CustomError.handleNotFound(res, "Идентификатор роли не предоставлен", 404);
            }

            const role = await Role.findByPk(id);
            if (!role) {
                return CustomError.handleNotFound(res, "Роль не найдена", 404);
            }

            await role.destroy();
            return res.status(200).json({ message: "Роль успешно удалена", status: 201 })
        } catch (error) {
            console.error("Ошибка при обновлении данных роли:", error);
            return CustomError.handleInternalServerError(res, "Ошибка при обновлении данных роли");
        }
    }
}

module.exports = new RoleController();