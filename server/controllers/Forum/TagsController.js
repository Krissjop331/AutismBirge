const CustomError = require('../../Errors/errors');
const db = require("../../models/index");
const Tags = db.Tags;


class TagsController {

    async getAll(req, res) {
        try {
            const { id, title, sort } = req.query;
            const where = {};
            if (id) where.id = id;
            if (title) where.title = { [Sequelize.Op.like]: '%${title}%' };
            console.log(sort)
            let order = [['id', 'ASC']];
            if (sort) {
                if (sort === 'asc') {
                    order = [['id', 'ASC']];
                } else if (sort === 'desc') {
                    order = [['id', 'DESC']];
                } else if (sort === 'title_asc') {
                    order = [['title', 'ASC']]; 
                } else if (sort === 'title_desc') {
                    order = [['title', 'DESC']]; 
                }
            }
    
            const tags = await Tags.findAll({
                where: where,
                order: order
            });
    
            if (!tags || tags.length === 0) {
                return CustomError.handleNotFound(res, "Тегов нет");
            }
    
            return res.status(200).json({ message: "Теги получены", tags });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Произошла ошибка", error: error.message });
        }
    }

    async getOne(req, res) {
        const { id } = req.params || req.body;
        if(!id) return CustomError.handleBadRequest(res, "Некорректно переданы данные")

        const tags = await Tags.findAll({
            where: {id}
        });
    
        if (!tags || tags.length === 0) {
            return CustomError.handleNotFound(res, "Тегов нет");
        }
    
        return res.status(200).json({ message: "Теги получены", tags });
    }

    async create(req, res) {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        const {title} = req.body;
        if(!title) return CustomError.handleBadRequest(res, "Не переданы данные");

        const tags = await Tags.create({
            title
        })

        return res.status(200).json({message: "Тег добавлен", tags, status: 201});
    }

    async update(req, res) {
        try {
            const { id } = req.params ;
            const {title} = req.body;
            if (!id) {
                return CustomError.handleBadRequest(res, "Не передан идентификатор или заголовок тега");
            }

            const tag = await Tags.findByPk(id);
            if (!tag) {
                return CustomError.handleNotFound(res, "Тег не найден");
            }

            tag.title = title;
            await tag.save();

            return res.status(200).json({ message: "Тег успешно обновлен", tag });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: `Произошла ошибка при обновлении тега: ${error.message}` });
        }
    }

    async delete(req, res) {
        const {id} = req. params || req.body;
        if(!id) return CustomError.handleBadRequest(res, "Не передан тег");

        const tags = await Tags.findByPk(id);
        await tags.destroy();

        return res.status(200).json({message: "Тег удален", tags, status: 201});
    }

}

module.exports = new TagsController();