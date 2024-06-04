const { validationResult } = require("express-validator");

const CustomError = require('../../Errors/errors');
const db = require("../../models/index");
const News = db.News;
const NewsResources = db.NewsResources;
const Tags = db.Tags;
const NewsTags = db.NewsTags;
const NewsResourcesMany = db.NewsResourcesMany;


class NewsController {

  async getAll(req, res) {
    try {
      const news = await News.findAll();

      if (!news || news.length === 0) {
        return CustomError.handleNotFound(res, "Новостей нет");
      }

      const newsResources = await NewsResourcesMany.findAll({
        include: [{
          model: NewsResources
        }, { model: News }]
      })

      const newsTags = await NewsTags.findAll({
        include: [{
          model: Tags
        }, { model: News }]
      })

      return res.status(200).json({ message: "Новости получены", news, newsResources, newsTags, status: 201 });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Что-то пошло не так" });
    }
  }

  async getId(req, res) {
    const { id, slug } = req.params || req.body;
    if (!id) return CustomError.handleBadRequest(res, "Неверно отправлен запрос");

    const news = await News.findOne({ where: { id } });
    if (!news) return CustomError.handleNotFound(res, "Данной новости не существует");

    const newsResources = await NewsResourcesMany.findAll({
      where: { news_id: id }, include: [{
        model: NewsResources
      }]
    })

    const newsTags = await NewsTags.findAll({
      where: { news_id: id }, include: [{
        model: Tags
      }, { model: News }]
    })

    return res.status(200).json({ message: "Новость получена", news, newsTags, newsResources })
  }

  async create(req, res) {

    const { title, description } = req.body || req.params;
    if (!req.body || !req.params && title == "undefined" || description == "undefined") {
      return CustomError.handleBadRequest(res, "Данные не переданы");
    }

    const newsDublicate = await News.findOne({ where: { title: title } });
    if (newsDublicate) return CustomError.handleDuplicateResource(res, "Данная новость уже существует с таким названием");

    const news = await News.create({
      title,
      slug: title.replace(/\s+/g, '-').toLowerCase(),
      description,
      looked: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    if (!news) return res.status(500).json({ message: "Новость создать не удалось" })

    return res.status(201).json({ message: "Новость создана", news })
  }


  // async update(req, res) {
  //     const {id} = req.params
  //     const {title, description} = req.body || req.params;
  //     let tags;
  //     let resources;

  //     if(!id) {
  //         return CustomError.handleNotFound(res, "Новость не найдена");
  //     }

  //     const news = await News.findByPk(id);
  //     if(!news) {
  //         return CustomError.handleNotFound(res, "Новость не найдена");
  //     }

  //     news.title = title || news.title;
  //     news.slug = title.replace(/\s+/g, '-').toLowerCase() || news.title
  //     news.description = description || news.description;

  //     if(req.params.tag_id || req.body.tag_id) {
  //         tags = await NewsTags.findOne({where: {news_id: id}});
  //         if(tags) {
  //             tags.tag_id = req.params.tag_id || req.body.tag_id || tags.tag_id
  //         }
  //         tags = await NewsTags.create({
  //             news_id: id,
  //             tag_id: req.params.tag_id || req.body.tag_id
  //         })
  //     }
  //     // Если передаем ресурс
  //     if(req.params.resources_id || req.body.resources_id || req.params.resources_title || req.body.resources_title && req.params.resources_url || req.body.resources_url) {
  //         resources = await NewsResourcesMany.findOne({where: {news_id: id}});
  //         // если есть ресурс, то мы получаем с бд ресурса
  //         if(!resources) {
  //                       // Если нет ресурса привязанной к этой новости, то мы ее создаем
  //             resources = await NewsResources.create({
  //                 title: req.params.resources_title || req.body.resources_title,
  //                 url: req.params.resources_url || req.body.resources_url
  //             })
  //             const resourcesAll = await NewsResources.count();
  //             await NewsResourcesMany.create({
  //                 news_id: id,
  //                 resources_id: resources.id || ++resourcesAll
  //             })
  //         }
  //         // если есть ресурс то мы обновляем сам ресурс привязанный к новости
  //         resources = await NewsResources.findOne({where: {id: resources.resources_id}});
  //         resources.title = req.params.resources_title || req.body.resources_title || resources.title;
  //         resources.title = req.params.resources_url || req.body.resources_url || resources.url;

  //     }

  //     return res.status(200).json({message: "Данные обновлены", news, resources, tags})
  // } 

  async update(req, res) {
    const { id } = req.params;
    const { title, description, tag_id, resources_title, resources_type, resources_url } = req.body;
  
    if (!id) {
      return CustomError.handleNotFound(res, "Новость не найдена");
    }
  
    const news = await News.findByPk(id);
    if (!news) {
      return CustomError.handleNotFound(res, "Новость не найдена");
    }
  
    news.title = title || news.title;
    news.slug = title ? title.replace(/\s+/g, '-').toLowerCase() : news.slug;
    news.description = description || news.description;
  
    if (tag_id) {
      const tag = await NewsTags.findOne({ where: { news_id: id, tag_id } });
      if (tag) {
        await NewsTags.destroy({ where: { news_id: id, tag_id } });
      } else {
        await NewsTags.create({
          news_id: id,
          tag_id
        });
      }
    }
  
    let resources_id = req.body.resources_id || req.params.resources_id;
    let resources;
  
    if (resources_title || resources_url || (req.file && resources_type)) {
      if (resources_id) {
        resources = await NewsResources.findOne({ where: { id: resources_id } });
      }
  
      if (resources) {
        resources.title = resources_title || resources.title;
        resources.url = (req.file ? req.file.path.replace(/\\/g, "/") : req.body.resources_url) || resources.url;
        resources.type = resources_type || resources.type;
        await resources.save();
      } else {
        resources = await NewsResources.create({
          title: resources_title,
          url: req.file ? req.file.path.replace(/\\/g, "/") : req.body.resources_url,
          type: resources_type
        });
        await NewsResourcesMany.create({
          news_id: id,
          resources_id: resources.id
        });
      }
    }
  
    try {
      await news.save();
    } catch (error) {
      console.error("Ошибка сохранения новости:", error);
      return res.status(500).json({ message: "Ошибка при сохранении новости" });
    }
  
    return res.status(200).json({ message: "Данные обновлены", news, resources });
  }
  

  async delete(req, res) {
    try {
      const { id } = req.params || req.body;
      const news = await News.findByPk(id);
      if (!news) return CustomError.handleNotFound(res, "Новость не найдена");

      // Найти и удалить ресурсы, связанные с новостью
      const newsResources = await NewsResourcesMany.findAll({
        where: { news_id: news.id },
      });

      if (newsResources && newsResources.length > 0) {
        const resourceIds = newsResources.map(resource => resource.resources_id);
        await NewsResourcesMany.destroy({
          where: { news_id: news.id }
        });
        await NewsResources.destroy({
          where: { id: resourceIds }
        });
      }

      // Найти и удалить теги, связанные с новостью
      const newsTags = await NewsTags.findAll({
        where: { news_id: news.id }
      });

      if (newsTags && newsTags.length > 0) {
        await NewsTags.destroy({
          where: { news_id: news.id }
        });
      }

      // Удалить саму новость
      await news.destroy();

      return res.status(200).json({ message: "Новость и её ресурсы успешно удалены" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Произошла ошибка при удалении новости и её ресурсов" });
    }
  }

  async addLook(req, res) {

  }

  // TAGS

  async createTagsNews(req, res) {
    const { id } = req.params;
    const { tag_id } = req.body || req.params;
    if (!id) return CustomError.handleBadRequest(res, "Новость не передана");
    const news = await News.findByPk(id);
    if (!news) return CustomError.handleNotFound(res, "Новость не найдена");

    let tags = await NewsTags.findAll({ where: { tag_id: tag_id, news_id: id } })
    if (tags) return CustomError.handleDuplicateResource(res, "У новости уже присвоен этот тег");

    tags = await NewsTags.create({
      news_id: id,
      tag_id: tag_id
    })
    if (!tags) return CustomError.handleBadRequest(res, "Не удалось добавить тег к новости")

    return res.status(200).json({ message: "Тег добавлен к новости", news, tags })
  }

  async createResourceNews(req, res) {
    const { title, url, type } = req.body;
    const { id } = req.params;
    if (!id) return CustomError.handleBadRequest(res, "Новость не передана");
    if (!req.body || !req.params) return CustomError.handleBadRequest(res, "Данные не переданы");

    const news = await News.findByPk(id);
    if (!news) return CustomError.handleNotFound(res, "Новость не найдена");

    const resources = await NewsResources.create({
      title,
      url: req.file?.path.replace(/\\/g, "/") || url,
      type
    });
    if (!resources) return CustomError.handleBadRequest(res, "Ресурс не добавлен");

    const resourcesMany = await NewsResourcesMany.create({
      news_id: id,
      resources_id: resources.id
    });

    return res.status(200).json({ message: "Ресурс добавлен", news, resources, resourcesMany });
  }


  async deleteTags(req, res) {
    const { newsId, tagId } = req.params;
    try {
      // Находим новость
      const news = await News.findByPk(newsId);
      if (!news) {
        return CustomError.handleNotFound(res, "Новость не найдена");
      }

      // Проверяем, существует ли тег у новости
      const tag = await NewsTags.findOne({ where: { news_id: newsId, tag_id: tagId } });
      if (!tag) {
        return CustomError.handleNotFound(res, "Тег не найден у этой новости");
      }

      // Удаляем тег из новости
      await NewsTags.destroy({ where: { news_id: newsId, tag_id: tagId } });

      return res.status(200).json({ message: "Тег успешно удален из новости" });
    } catch (error) {
      console.error("Ошибка при удалении тега из новости:", error);
      return CustomError.handleInternalServerError(res, "Произошла ошибка при удалении тега из новости");
    }
  }


  async deleteResources(req, res) {
    const { newsId, resources_id } = req.body;  // Извлечение данных из body
    try {
      // Находим новость
      const news = await News.findByPk(newsId);
      if (!news) {
        return CustomError.handleNotFound(res, "Новость не найдена");
      }

      const resources = await NewsResourcesMany.findOne({
        where: { news_id: newsId, resources_id: resources_id },
        include: [{ model: NewsResources }]
      });
      if (!resources) {
        return CustomError.handleNotFound(res, "Ресурс не найден у этой новости");
      }



      await NewsResourcesMany.destroy({ where: { news_id: newsId, resources_id: resources_id } });
      await NewsResources.destroy({ where: { id: resources_id } });

      return res.status(200).json({ message: "Ресурс успешно удален из новости" });
    } catch (error) {
      console.error("Ошибка при удалении ресурса из новости:", error);
      return CustomError.handleInternalServerError(res, "Произошла ошибка при удалении ресурса из новости");
    }
  }





  с


}

module.exports = new NewsController();