const CustomError = require('../../Errors/errors');
const db = require("../../models/index");
const User = db.User;
const Role = db.Role;
const ParentsUsers = db.ParentsUsers;


class ParentUsersController {

    async getAll(req, res) {
        try {
            const parentUsers = await ParentsUsers.findAll();
            if (!parentUsers || parentUsers.length === 0) {
                return res.status(404).json({ message: "Пользователи не найдены", status: 404, parentUsers });
            }
    
            const parentIds = parentUsers.map(parentUser => parentUser.parent_id);
            const childIds = parentUsers.map(parentUser => parentUser.child_id);
    
            const parents = await User.findAll({ where: { id: parentIds } });
            const users = await User.findAll({ where: { id: childIds } });
    
            return res.status(200).json({ message: "Получены пользователи", status: 200, parentUsers, parents, users });
        } catch (error) {
            console.error("Ошибка на сервере", error);
            return CustomError.handleInternalServerError(res, "Ошибка на сервере", 500);
        }
    }

    async getId(req, res) {
        const { id } = req.params || req.body || req.query;
        if (!id) {
            return CustomError.handleInvalidData(res, "Не передан пользователь");
        }
        let type = req.body.type || req.params.type || "parent";
        let parentUser;

        try {
            if (type === 'parent') {
                parentUser = await parentUser.findAll({
                    where: { parent_id: id },
                });

                const parentIds = parentUser.map(parentUser => parentUser.parent_id);
                const childIds = parentUser.map(parentUser => parentUser.child_id);
                const parents = await User.findAll({ where: { id: parentIds } });
                const users = await User.findAll({ where: { id: childIds } });

                return res.status(200).json({ message: "Получены пользователи", parents, users });
            } else if (type === "users" || type === "child") {
                parentUser = await ParentsUsers.findAll({
                    where: { child_id: id },
                });

                const parentIds = parentUser.map(parentUser => parentUser.parent_id);
                const childIds = parentUser.map(parentUser => parentUser.child_id);
                const parents = await User.findAll({ where: { id: parentIds } });
                const users = await User.findAll({ where: { id: childIds } });

                return res.status(200).json({ message: "Получены пользователи", parents, users });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Произошла ошибка", error: error.message });
        }

        if (!parentUser) {
            return CustomError.handleNotFound(res, "Доктор либо пациент не найдены");
        }

        return res.status(200).json({ message: "Пользователи получены", parentUser });
    }

    async create(req, res) {
        const { user_id, parent_id } = req.body;
        try {
            if (!user_id || !parent_id) {
                return CustomError.handleNotFound(res, "Не передан пользователь или доктор");
            }

            const parent = await User.findOne({ where: { id: parent_id }, include: [{ model: Role }] });
            const child = await User.findOne({ where: { id: user_id }, include: [{ model: Role }] });
            if (!parent || !child) {
                return CustomError.handleNotFound(res, "Пользователь не найден");
            }

            const parentRole = parent.Role.name;
            if (parentRole !== 'parents') {
                return CustomError.handleInvalidData(res, "Пользователь не является родителем");
            }
            const parentUser = await ParentsUsers.create({
                child_id: user_id,
                parent_id,
                parent: req.body.parent || 'mother'
            });
            if (!parentUser) {
                return res.status(500).json({ message: "Ошибка добавления родителя к ребенку" });
            }

            return res.status(201).json({ message: "Родитель успешно добавлен к ребенку", status: 200, parentUser, parent, child });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Произошла ошибка", error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { user_id, parent_id, parent } = req.body;
            if (!user_id || !parent_id) {
                return CustomError.handleInvalidData(res, "Не переданы все необходимые данные");
            }

            let parentUser = await ParentsUsers.findOne({
                where: {
                    child_id: user_id,
                    parent_id: parent_id,
                }
            });

            const parentRole = await User.findOne({where: {id: parent_id}, include: [{model: Role}]});
            if (!parentUser) {
                if(parentRole.Role.name !== 'parent') {
                    return res.status(403).json({message: "Данный пользователь не является доктором"})
                }
                parentUser = await ParentsUsers.create({
                    child_id: user_id,
                    parent_id: parent_id,
                    parent: parent || null
                });
    
                return res.status(201).json({ message: "Ребенок успешно добавлен к доктору", parentUser });
            }
    
            if (parentUser.child_id !== user_id || parentUser.parent_id !== parent_id) {
                return CustomError.handleInvalidData(res, "Нельзя изменить идентификаторы пользователя и врача, так как доктор уже привязан к этому ребенку");
            }
            parentUser.specialization = specialization || null;
            await parentUser.save();
    
            return res.status(200).json({ message: "Запись parentUser успешно обновлена", parentUser });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Произошла ошибка", error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { user_id, parent_id } = req.body;
            if (!user_id || !parent_id) {
                return CustomError.handleInvalidData(res, "Не переданы все необходимые данные");
            }
    

            const parentUser = await ParentsUsers.findOne({
                where: {
                    child_id: user_id,
                    parent_id: parent_id
                }
            });
            if (!parentUser) {
                return CustomError.handleNotFound(res, "Ребенок не является привязанным к этому доктору");
            }
            await parentUser.destroy();
    
            return res.status(200).json({ message: "Ребенок успешно удален у доктора" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Произошла ошибка", error: error.message });
        }
    }

}

module.exports = new ParentUsersController();