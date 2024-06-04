const { validationResult } = require("express-validator");

const CustomError = require('../../Errors/errors');
const db = require("../../models/index");
const Articles = db.Articles;
const ArticlesTags = db.ArticlesTags;
const Tags = db.Tags;


class NewsController {

    async getAll(req, res) {
        try {
            const articles = await Articles.findAll({include: [{model: User}]});
    
            if (!articles || articles.length === 0) {
                return CustomError.handleNotFound(res, "Статьи нет");
            }
            const articlesTags = await NewsTags.findAll({include: [{
                model: Tags
            }, {model: Articles}]})
    
            return res.status(200).json({ message: "Cтатьи получены", articles, articlesTags, status: 201 });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Что-то пошло не так" });
        }
    }

    async getId(req, res) {
        const {id} = req.params || req.body;
        if(!id) return CustomError.handleBadRequest(res, "Неверно отправлен запрос");

        const articles = await Articles.findOne({where: {id}});
        if(!articles) return CustomError.handleNotFound(res, "Данной статьи не существует");

        
        const articlesTags = await ArticlesTags.findOne({where: {id}, include: [{
            model: Tags
        }, {model: Articles}]})

        return res.status(200).json({message:"Статья получена", articles, articlesTags})
    }

    async create(req, res) {

        const {title, description} = req.body || req.params;
        if(!req.body || !req.params && title == "undefined" || description == "undefined") {
            return CustomError.handleBadRequest(res, "Данные не переданы");
        }
        
        const articlesDublicate = await Articles.findOne({where: {title: title}});
        if(articlesDublicate) return CustomError.handleDuplicateResource(res, "Данная статья уже существует с таким названием");

        let user;
        let token;
        if (req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
            const { id } = jwt.verify(token, secret);
            user = await User.findOne({where: {id: id}});
            if(!user) return CustomError.handleNotFound(res, "Пользователь не найден");
        } else {
            return res.status(403).json({message: "Вы не авторизованы"});
        }

        const articles = await Articles.create({
            title,
            slug: title.replace(/\s+/g, '-').toLowerCase(),
            description,
            looked: 0,
            blocked: false,
            url: req.body.url || '',
            author_id: user.id,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        const articlesTags = await ArticlesTags.create({
            tags_id: req.body.tags_id || req.params.tags_id,
            articles_id: articles.id
        })

        if(!articles) return res.status(500).json({message: "Статью создать не удалось"})
            
        return res.status(201).json({message: "Статья создана", articles, articlesTags, user}) 
    }

    async delete(req, res) {
        try {
            const { id } = req.params || req.body;
            const articles = await Articles.findByPk(id);
            if (!articles) return CustomError.handleNotFound(res, "Статья не найдена");

    
            // Найти и удалить теги, связанные с новостью
            const articlesTags = await ArticlesTags.findAll({
                where: { articles_id: articles.id }
            });
    
            if (articlesTags && articlesTags.length > 0) {
                await ArticlesTags.destroy({
                    where: { articles_id: articles.id }
                });
            }
    
            // Удалить саму новость
            await articles.destroy();
    
            return res.status(200).json({ message: "Статьи успешно удалены" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Произошла ошибка при удалении статей" });
        }
    }
}

module.exports = new NewsController();