const { validationResult } = require("express-validator");

const CustomError = require('../../Errors/errors');
const db = require("../../models/index");
const Resources = db.Resources;
const ResourcesType = db.ResourcesType;
const ResourcesModule = db.ResourcesModule;


class ResourcesController {

    async getAll(req, res) {
        const resources = await Resources.findAll({
            include: [{
                model: ResourcesType
            },
            {
                model: ResourcesModule
            }]
        });
        if(!resources) return CustomError.handleNotFound(res, "Ресурсов нет");
        
        return res.status(200).json({message: "Ресурсы получены", resources, status: 201});
    }

    async getId(req, res) {
        const {id, slug} = req.params || req.body;
        if(!id) return CustomError.handleBadRequest(res, "Неверно отправлен запрос");

        // ? Сделать проверку на id, на если slug и на если тип и модуль
        const resources = await Resources.findOne({where: {id}, include: [{model: ResourcesType}, {model: ResourcesModule}]})   
        if(!resources) return CustomError.handleNotFound(res, "Данный ресурс не найден");

        return res.status(200).json({message:"Ресурс найден", resources})
    }

    async create(req, res) {
        try {
            const { title, description, url, type_id, module_id, url_description } = req.body;
            if (!req.body || !req.params) {
                return CustomError.handleBadRequest(res, "Данные не переданы");
            }
    
            // Проверка на дубликаты
            const resourcesDublicate = await Resources.findOne({ where: { title: title } });
            if (resourcesDublicate) {
                return CustomError.handleDuplicateResource(res, "Ресурс уже существует с таким названием");
            }
    
            // Создание ресурса
            let resources = await Resources.create({
                title,
                slug: title.replace(/\s+/g, '-').toLowerCase(),
                description,
                url: url || '',
                ulr_description: url_description || '',
                // file_patch: req.file?.path || req.body.file?.path || '',
                file_patch: req.file?.path.replace(/\\/g, "/") || req.body.file?.path || '',
                type_id,
                module_id
            });
    
            if (!resources) {
                return res.status(500).json({ message: "Ресурс создать не удалось" });
            }
    
            // Проверка на наличие модуля и типа
            const resourcesModule = await ResourcesModule.findOne({ where: { id: module_id } });
            const resourcesType = await ResourcesType.findOne({ where: { id: type_id } });
            if (!resourcesModule && !resourcesType) {
                return CustomError.handleNotFound(res, "Модуль или тип не найдены");
            }
    
            // Собираем данные для ответа
            const response = {
                resource: resources,
                module: resourcesModule,
                type: resourcesType
            };
    
            return res.status(200).json({ message: "Данные получены", data: response });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Произошла ошибка при создании ресурса", error });
        }
    }

    async update(req, res) {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        const {id} = req.params || req.body;
        if(!id) return CustomError.handleBadRequest(res, "Неверно отправлен запрос");

        const resources = await Resources.findOne({where: {id}, include: [{
                model: ResourcesModule
            },
            {
                model: ResourcesType
            }
        ]});
        if(!resources) return CustomError.handleNotFound(res, "Ресурс не найден и не может быть обновлен");

        resources.title = req.body.title || resources.title;
        resources.slug = req.body.title.replace(/\s+/g, '-').toLowerCase() || resources.slug;
        resources.description = req.body.description || resources.description;
        resources.url = req.body.url || resources.url;
        resources.file_patch = req.body.file || req.params.file || req.file || resources.file_patch;
        resources.type_id = req.body.type_id || req.params.type_id || resources.type_id;
        resources.module_id = req.body.module_id || req.params.module_id || resources.module_id;
        resources.url_description = req.body.url_description || req.params.url_description || resources.url_description
        await resources.save();

        return res.status(200).json({message: "Ресурс обновлен", resources})
    }

    async delete(req, res) {
        const {id} = req.params || req.body;
        if(!id) return CustomError.handleBadRequest(res, "Неверно отправлен запрос");

        const resources = await Resources.findOne({where: {id}});
        if(!resources) return CustomError.handleNotFound(res, "Ресурс не найден");

        await resources.destroy();

        return res.status(200).json({message: "Ресурс успешно удален", status: 201});
    }

    // ---------------------------------------
        // ! MODULE
    // ---------------------------------------

    async getAllModules(req, res) {
        const resourcesModule = await ResourcesModule.findAll();
        if(!resourcesModule && resourcesModule.length < 0) return res.status(200).json({message: "Модули ресурсов не найдены", resourcesModule, status: 201});

        return res.status(200).json({message: "Модули ресурсов получены", module: resourcesModule, status: 201});
    }

    async getModule(req, res) {
        const {id} = req.params || req.body;
        if(!id || !req.body || !req.params) return CustomError.handleBadRequest(res);

        const resourcesModule = await ResourcesType.findByPk(id);
        if(!resourcesModule) return CustomError.handleNotFound(res);

        return res.status(200).json({message: "Модуль получен", type: resourcesModule, status: 201});
    }

    async createModule(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {module} = req.params || req.body;  
        if(!module || !req.body || !req.params) return CustomError.handleBadRequest(res);
        const resourceDublicate = await ResourcesModule.findOne({where: {module: module.toLowerCase()}});
        if(resourceDublicate) return CustomError.handleDuplicateResource(res, "Такой модуль уже существует");


        const resourcesModule = await ResourcesModule.create({
            module
        });
        if(!resourcesModule) return res.status(403).json({message: "Модуль не удалось добавить", status: 403});
        

        return res.status(200).json({message: "Модуль добавлен", module: resourcesModule, status: 201});
    }

    async updateModule(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {id, module} = req.params || req.body;
        if(!id || !req.body || !req.params) return CustomError.handleBadRequest(res);

        const resourcesModule = await ResourcesModule.findByPk(id);
        const resourceDublicate = await ResourcesModule.findOne({where: {module: module.toLowerCase()}});
        if(!resourcesModule) return CustomError.handleNotFound(res);
        if(resourceDublicate) return CustomError.handleDuplicateResource(res, "Такой модуль уже существует");

        resourcesModule.module = module || resourcesModule.module;
        await resourcesModule.save();

        return res.status(200).json({message: "Модуль обновлен", module: resourcesModule, status: 201});
    }

    async deleteModule(req, res) {
        const {id, module} = req.params || req.body;
        if(!id || !req.body || !req.params) return CustomError.handleBadRequest(res);

        const resourcesModule = await ResourcesModule.findOne({where: {
            id,
            module
        }})
        if(!resourcesModule) return CustomError.handleInvalidData(res, "Удалять нечего");
        
        await resourcesModule.destroy();

        return res.status(200).json({message: "Модуль удален", status: 201})
    }

    // ---------------------------------------
        // ! TYPE
    // ---------------------------------------

    async getAllTypes(req, res) {
        const resourcesType = await ResourcesType.findAll();
        if(!resourcesType && resourcesType.length < 0) return res.status(200).json({message: "Типы ресурсов не найдены", resourcesType, status: 201});

        return res.status(200).json({message: "Типы ресурсов получены", type: resourcesType, status: 201});
    }

    async getType(req, res) {
        const {id} = req.params || req.body;
        if(!id || !req.body || !req.params) return CustomError.handleBadRequest(res);

        const resourcesType = await ResourcesType.findByPk(id);
        if(!resourcesType) return CustomError.handleNotFound(res);

        return res.status(200).json({message: "Тип получен", type: resourcesType, status: 201});
    }

    async createType(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if(!req.body) return CustomError.handleBadRequest(res);
        const resourceDublicate = await ResourcesType.findOne({where: {type: type.toLowerCase()}});
        if(resourceDublicate) return CustomError.handleDuplicateResource(res, "Такой тип уже существует");
        const resourcesType = await ResourcesType.create({
            type: req.body.type
        });
        if(!resourcesType) return res.status(403).json({message: "Тип не удалось добавить", status: 403});
        
        return res.status(200).json({message: "Тип добавлен", type: resourcesType, status: 201});
    }

    async updateType(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {id, type} = req.params || req.body;
        if(!id || !req.body || !req.params) return CustomError.handleBadRequest(res);

        const resourcesType = await ResourcesType.findByPk(id);
        const resourceDublicate = await ResourcesType.findOne({where: {type: type.toLowerCase()}});
        if(!resourcesType) return CustomError.handleNotFound(res);
        if(resourceDublicate) return CustomError.handleDuplicateResource(res, "Такой тип уже существует");

        resourcesType.type = type || resourcesType.type;
        await resourcesType.save();

        return res.status(200).json({message: "Тип обновлен", type: resourcesType, status: 201});
    }   

    async deleteType(req, res) {
        const {id, type} = req.params || req.body;
        if(!id || !req.body || !req.params) return CustomError.handleBadRequest(res);

        const resourceType = await ResourcesType.findOne({where: {
            id,
            type
        }})
        if(!resourceType) return CustomError.handleInvalidData(res, "Удалять нечего");
        
        await resourceType.destroy();

        return res.status(200).json({message: "Тип удален", status: 201})
    }

}

module.exports = new ResourcesController();