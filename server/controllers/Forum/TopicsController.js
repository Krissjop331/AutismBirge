const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const config = require('../../config/config.json');
const secret = config.secretKey || 'JWTKEY';

const CustomError = require('../../Errors/errors');
const db = require("../../models/index");
const User = db.User;
const Topics = db.Topics;
const CommentTopics = db.CommentTopics;
const CommentTMany = db.CommentTMany;
const Role = db.Role;
const Forum = db.Forum;
const Likes = db.LikesTopics;
const Dislikes = db.DislikesTopics;


class TopicsController {

    async getAll(req, res) {
        try {
            const { title, slug, authorId, sortBy, sortOrder } = req.query;

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
            
            const topics = await Topics.findAll({
                where: where,
                order: order,
                include: [{model: User}, {model: Forum}]
            });

            for (const topic of topics) {
                const comments = await CommentTMany.findAll({
                    where: { topics_id: topic.id },
                    include: [{model: CommentTopics}]
                });
                topic.comments = comments;
            }

            return res.status(200).json({ message: "Темы и комментарии получены", topics });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Произошла ошибка", error: error.message });
        }
    }

    async getOne(req, res) {
        const {id} = req.params || req.body;
        if(!req.params || !req.body) return CustomError.handleBadRequest(res, "Данные не переданы");
        
        const topics = await Topics.findOne({where: {id: id}, include: [{model: User}, {model: Forum}]});
        if(!topics) return CustomError.handleNotFound(res, "Тем пока нет");

        const comments = await CommentTMany.findAll({where: {topics_id: topics.id},  include: [{model: Topics}, {model: CommentTopics}]});
        
        return res.status(200).json({message: "Тема получена", topics, comments, status: 201});
    }

    async create(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {id} = req.params
        const {title, description} = req.body;
        if(!req.params || !req.body) return CustomError.handleBadRequest(res, "Данные не переданы");
        let user;
        let token;
        if (req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
            const { id } = jwt.verify(token, secret);
            user = await User.findOne({where: {id: id}, include: [{model: Role}]});
            if(!user) return CustomError.handleNotFound(res, "Пользователь не найден");
        } else {
            return res.status(403).json({message: "Вы не авторизованы"});
        }
        const forum = await Forum.findByPk(id);
        if(!forum) return CustomError.handleNotFound(res, "Форум не найден");

        const topics = await Topics.create({
            title,
            slug: title.replace(/\s+/g, '-').toLowerCase(),
            description,
            author_id: user.id,
            status: "open",
            looked: 0,
            likes: 0,
            dislikes: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            forum_id: forum.id
        })
        if(!topics) return res.status(500).json({message:"Не удалось создать тему", status: 500, topics})

        return res.status(200).json({message: "Тема успешно создана", topics, status: 201});    
    }

    async update(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {id, topics_id, title, description, date, looked, status} = req.params || req.body;
        let user;
        let token;
        if(req.params || req.body) return CustomError.handleBadRequest(res, "Данные не переданы");
        if (req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
            const { id } = jwt.verify(token, secret);
            user = await User.findOne({where: {id: id}, include: [{model: Role}]});
            if(!user) return CustomError.handleNotFound(res, "Пользователь не найден");
        } else {
            return res.status(403).json({message: "Вы не авторизованы"});
        }
        let topics = await Topics.findOne({where: {id: topics_id, author_id: user.id}, include: [{model: User}]});
        if(!topics) return res.status(403).json({message: "Вы не являетесь автором данной статьи"});
        let forum = await Forum.findByPk(id);
        if(!forum) return res.status(403).json({message: "Форум не найден"});

        topics.title = title || topics.title;
        topics.slug = title.replace(/\s+/g, '-').toLowerCase() || topics.slug;
        topics.description = description || topics.description;
        topics.updatedAt = date || topics.updatedAt;
        topics.looked = looked == true ? topics.looked++ : topics.looked
        topics.forum_id = forum.id || topics.forum_id;
        topics.status = status || topics.status
        await topics.save();

        return res.status(200).json({message: "Тема успешно обновлена", topics, status: 201});
    }

    async delete(req, res) {
        const {id} = req.params || req.body;
        if(req.params || req.body) return CustomError.handleBadRequest(res, "Данные некорректны");

        const topics = await Topics.findByPk(id);
        if(!topics) return CustomError.handleNotFound(res, "Тема не найдена");
        const comments = await CommentTMany.findAll({where: {topics_id: topics.id}});
        for(let comment of comments) {
            await comment.destroy();
        }
        await topics.destroy();

        return res.status(200).json({message: "Тема удалена", status: 201});
    }

    
    // COMMENT
    async getAllComment(req, res) {
        const {id} = req.params || req.body;
        let where = id ? {topics_id: id} : {};
        if(!req.params || !req.body) return CustomError.handleBadRequest(res, "Данные некорректны");

        const commentTopics = await CommentTMany.findAll({where, include: [{model: CommentTopics, include: [{model: User}]}, {model: Topics}]});
        if(!commentTopics || commentTopics <= 0) return CustomError.handleNotFound(res, "Комментарии не найдены");
        
        return res.status(200).json({message: "Комментарии получены", commentTopics, status: 201});
    }

    async getOneComment(req, res) {
        const {id, comment_id} = req.params || req.body;
        if(req.params || req.body) return CustomError.handleBadRequest(res, "Данные некорректны");

        const commentTopics = await CommentTMany.findOne({where: {topics_id: id, comment_id}, include: [{model: Topics}, {model: CommentTopics, include: []}]});
        if(!commentTopics) return CustomError.handleNotFound(res, "Комментарии не найдены");

        return res.status(200).json({message: "Комментарий получен", commentTopics, status: 201})
    }

    async createComment(req, res) {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }
        const {id} = req.params;
        if(!req.params) return CustomError.handleBadRequest(res, "Данные некорректны");
        let user;
        let token;
        if (req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
            const { id } = jwt.verify(token, secret);
            user = await User.findOne({where: {id: id}, include: [{model: Role}]});
            if(!user) return CustomError.handleNotFound(res, "Пользователь не найден");
        } else {
            return res.status(403).json({message: "Вы не авторизованы"});
        }

        const commentTopicsAll = await CommentTopics.findAll();
        let commentTopics = await CommentTopics.create({
            content: req.body.content,
            file_patch: req.file?.path.replace(/\\/g, "/") || req.body.file?.path || '',
            likes: 0,
            dislikes: 0,
            author_id: user.id,
        })
        if(commentTopics == null || commentTopics == undefined || commentTopics == []) return res.status(403).json({message: "Не удалось создать комментарий", commentTopics});

        let commentTMany = await CommentTMany.create({
            comment_topics_id: commentTopics.id,
            topics_id: id,
            status: 1
        })
        commentTMany = await CommentTMany.findOne({where: {id: commentTMany.id},  include: [{model: Topics, include: [{model: User}]}, {model: CommentTopics, include: [{model: User}]}]})
        //const checkCommentDublicate = await CommentTMany.findOne({where: {topics_id: id, comment_topics_id: commentTopicsAll.length++}})
        const status = commentTMany.Topic.status;
        // if(checkCommentDublicate) return res.status(403).json({message: "Не удалось создать комментарий", checkCommentDublicate});
        if(status === 'close' || status != 'open') return res.status(403).json({message: "Эта тема уже закрыта. Вы не можете добавлять комментарии"});

        return res.status(200).json({message: "Комментарий создан", commentTMany});
    }


    async deleteComment(req, res) {
        const {id, comment_id} = req.params || req.body;
        if(req.params || req.body) return CustomError.handleBadRequest(res, "Данные некорректны");
        
        let commentTopics = await CommentTopics.findOne({where: {comment_id}});
        if(!commentTopics) return CustomError.handleNotFound(res, "Комментарий не найден");
        commentTopics = await CommentTMany.findOne({where: {topics_id: id, comment_topics_id: comment_id}});
        await commentTopics.destroy();

        return res.status(200).json({message: "Комментарий удален", status: 201});
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

        const topics = await Topics.findOne({where: {id}});
        if(!topics) return CustomError.handleNotFound(res, "Тема не найдена");

        const existingLikes = await Likes.findOne({where: {user_id: user.id, topics_id: topics.id}})
        if(existingLikes) {
            await existingLikes.destroy();
            return res.status(200).json({message: "Лайк удален", existingLikes, status: 201});
        }

        let newLikes = await Likes.create({
            user_id: user.id,
            topics_id: topics.id
        })

        newLikes = await Likes.findOne({where: {id: newLikes.id}, include: [{model: User, as: 'users'}, {model: Topics, as: 'topics' }]})
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

        const topics = await Topics.findOne({where: {id}});
        if(!topics) return CustomError.handleNotFound(res, "Тема не найдена");

        const existingsDislikes = await Likes.findOne({where: {user_id: user.id, topics_id: topics.id}})
        if(existingsDislikes) {
            await existingsDislikes.destroy();
            return res.status(200).json({message: "Лайк удален", existingsDislikes, status: 201});
        }

        const newDisikes = await Dislikes.create({
            user_id: user.id,
            topics_id: topics.id
        })
        newDisikes = await Likes.findOne({where: {id: newDisikes.id}, include: [{model: User, as: 'users'}, {model: Topics, as: 'topics' }]})

        return res.status(201).json({ message: 'Дизлайк успешно добавлен', dislike: newDisikes });
    }
}

module.exports = new TopicsController();