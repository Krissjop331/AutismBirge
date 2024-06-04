const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const config = require('../../config/config.json');
const secret = config.secretKey || 'JWTKEY';

const CustomError = require('../../Errors/errors');
const db = require("../../models/index");
const User = db.User;
const Forum = db.Forum;
const Role = db.Role;
const FeaturedForum = db.FeaturedForum;
const Topics = db.Topics;
const Tags = db.Tags;
const Likes = db.LikesForum;
const Dislikes = db.DislikesForum;


class ForumController {

    async getAll(req, res) {
        try {
            const { title, slug, authorId, sortBy, sortOrder, tagsId } = req.query;

            let where = {};
            if (title) {
                where.title = { [Sequelize.Op.like]: `%${title}%` };
            }
            if (slug) {
                where.slug = slug;
            }
            if (authorId) {
                where.author_id = authorId;
            }
            if(tagsId) {
                where.tags_id = tagsId
            }

            let order = [['createdAt', 'ASC']];
            if (sortBy) {
                if (sortBy === 'likes') {
                    order = [[ 'likes', sortOrder === 'asc' ? 'ASC' : 'DESC' ]];
                } else if (sortBy === 'dislikes') {
                    order = [[ 'dislikes', sortOrder === 'asc' ? 'ASC' : 'DESC' ]];
                } else if (sortBy === 'looked') {
                    order = [[ 'looked', sortOrder === 'asc' ? 'ASC' : 'DESC' ]];
                }
            }
            
            const forum = await Forum.findAll({
                where: where,
                order: order,
                include: [{model: User}, {model: Topics}, {model: Tags}]
            });
            if(forum.length < 0 || !forum) return CustomError.handleNotFound(res, "В данный момент форумов нет")

            return res.status(200).json({ message: "Темы и комментарии получены", forum });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Произошла ошибка", error: error.message });
        }
    }

    async getOne(req, res) {
        const {id} = req.params || req.body;
        if(!req.body || !req.params) return CustomError.handleBadRequest(res, "Некорректно переданы данные");

        const forum = await Forum.findOne({
            where: { id },
            include: [
                { model: Tags },
                {
                    model: Topics,
                    include: [{ model: User }]
                },
                {
                    model: User
                }
            ]
        });
        if(!forum) return CustomError.handleNotFound(res, "Форум не найден");

        return res.status(200).json({message: "Форум получен", forums: forum, status: 201});
    }

    async create(req, res) {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        const {title, description, tags_id} = req.body;
        if(!req.body) return CustomError.handleBadRequest(res, "Данные не получены")

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

        const forum = await Forum.findOne({where: {title: title}});
        if(forum) return CustomError.handleNotFound(res, "Данный форум уже существует");
        let newForum = await Forum.create({
            title,
            slug: title.replace(/\s+/g, '-').toLowerCase(),  
            description,
            author_id: user.id,
            tags_id,
            // likes: 0
            // dislikes: 0,
            looked: 0,
        })
        if(!newForum) return res.status(403).json({message: "Что-то пошло не так", newForum});
        newForum = await Forum.findOne({where: {id: newForum.id}, include: [{model: User, include: [{model: Role}]}, {model: Tags}]})

        return res.status(200).json({message: "Форум добавлен", newForum, status: 201});
    }

    async update(req, res) {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        const {id, title, description, looked, tags_id} = req.params || req.body;
        if(!req.params || !req.body) return CustomError.handleBadRequest(res, "Некорректно переданы данные");

        let forum = await Forum.findOne({where: {id: id}, include: [{model: Tags}, {model: User}]})
        if(!forum) return CustomError.handleNotFound(res, "Данный форум не найден");

        forum.title = title || forum.title;
        forum.slug = title ? title.replace(/\s+/g, '-').toLowerCase() : forum.slug;
        forum.description = description || forum.description;
        forum.tags_id = tags_id || forum.tags_id;
        forum.looked = looked ? looked++ : forum.looked;
    }

    async delete(req, res) {
        const {id} = req.params || req.body;
        if(!req.body || !req.params) return CustomError.handleBadRequest(res, "Некорректно переданы данные");

        const forum = await Forum.findOne({where: {id}})
        if(!forum) return CustomError.handleNotFound(res, "Форум не найден");
        await forum.destroy();

        return res.status(200).json({message: "Форум удален", status: 201});
    }

// FEATURED

    async getFeatured(req, res) {
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
        const featured = await FeaturedForum.findAll({where: {user_id: user.id }, include: [{model: User, model: Forum}]})
        if(!featured || featured.length <= 0) return CustomError.handleNotFound(res, "Избранных форумов не найдено");
        
        return res.status(200).json({message: "Избранные форумы получены", featured, status: 200});
    }

    async addFeatured(req, res) {
        const {forum_id} = req.params || req.body;
        const {id} = req.params || req.body || req.query
        let user;
        let token;
        if(req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
            const {id} = jwt.verify(token, secret);
            user = await User.findOne({where: {id}});
            if(!user) return CustomError.handleNotFound(res, "Пользователь не найден");
        } else {
            return res.status(403).json({message: "Вы не авторизованы"});
        }

        const featured = await FeaturedForum.create({
            user_id: user.id,
            forum_id: id
        })
        if(!featured) return CustomError.handleNotFound(res, "Избранный форум не найден");

        return res.status(200).json({message: "Избранный форум добавлен", featured, status: 201});
    }

    async removeFeatured(req, res) {
        const {forum_id} = req.params;
        const {id} = req.params || req.body || req.query 
        let user;
        let token;
        if(req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
            const {id} = jwt.verify(token, secret);
            user = await User.findOne({where: {id}});
            if(!user) return CustomError.handleNotFound(res, "Пользователь не найден");
        } else {
            return res.status(403).json({message: "Вы не авторизованы"});
        }

        const featured = await FeaturedForum.findOne({where: {user_id: user.id, forum_id: id}})
        if(!featured) return CustomError.handleNotFound(res, "Избранный форум не найден");
        await featured.destroy();
        return res.status(200).json({message: "Избранный форум удален", featured, status: 201});
    }


    // ADD LIKES 
    async addLikes(req, res) {
        const {id} = req.params;
        if(!id) return CustomError.handleBadRequest(res, "Данные переданы некорректно");
        let user;
        let token;
        if(req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
            const {id} = jwt.verify(token, secret);
            user = await User.findOne({where: {id}});
            if(!user) return CustomError.handleNotFound(res, "Пользователь не найден");
        } else {
            return res.status(403).json({message: "Вы не авторизованы"});
        }

        const forum = await Forum.findOne({where: {id}});
        if(!forum) return CustomError.handleNotFound(res, "Форум не найден");

        const existingDisikes = await Likes.findOne({where: {user_id: user.id, forum_id: forum.id}})
        if(existingDisikes) {
            await existingDisikes.destroy();
            return res.status(200).json({message: "Лайк удален", existingDisikes, status: 201});
        }

        let newLikes = await Likes.create({
            user_id: user.id,
            forum_id: forum.id
        })

        newLikes = await Likes.findOne({where: {id: newLikes.id}, include: [{model: User, as: 'users'}, {model: Forum, as: 'forum' }]})
        return res.status(201).json({ message: 'Лайк успешно добавлен', like: newLikes });
    }

    async addDislikes(req, res) {
        const {id} = req.params;
        if(!id) return CustomError.handleBadRequest(res, "Данные переданы некорректно");
        let user;
        let token;
        if(req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
            const {id} = jwt.verify(token, secret);
            user = await User.findOne({where: {id}});
            if(!user) return CustomError.handleNotFound(res, "Пользователь не найден");
        } else {
            return res.status(403).json({message: "Вы не авторизованы"});
        }

        const forum = await Forum.findOne({where: {id}});
        if(!forum) return CustomError.handleNotFound(res, "Форум не найден");

        const existingLikes = await Dislikes.findOne({where: {user_id: user.id, forum_id: forum.id}})
        await existingLikes.destroy();
        if(existingLikes) return res.status(200).json({message: "Дизлайк удален", existingLikes, status: 201});

        const newDisikes = await Dislikes.create({
            user_id: user.id,
            forum_id: forum.id
        })
        newDisikes = await Likes.findOne({where: {id: newDisikes.id}, include: [{model: User, as: 'users'}, {model: Forum, as: 'forum' }]})

        return res.status(201).json({ message: 'Дизлайк успешно добавлен', dislike: newDisikes });
    }

}
module.exports = new ForumController();