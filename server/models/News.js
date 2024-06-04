module.exports = (sequelize, DataTypes) => {
    const News = sequelize.define("News", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
        },
        slug: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
        looked: {
            type: DataTypes.INTEGER,
        }
    }, {
        tableName: 'news'
    });

    News.associate = function(models) {
        // News.belongsToMany(models.Tags, { as: 'news_tags_many', through: 'news_tags', timestamps: false, foreignKey: 'news_id', onDelete: 'CASCADE' });
        // News.belongsToMany(models.NewsResources, { as: 'news_res_many', through: 'news_resources_many', timestamps: false, foreignKey: 'news_id', onDelete: 'CASCADE' });
        News.hasMany(models.NewsTags, { foreignKey: 'news_id' })
        News.hasMany(models.NewsResourcesMany, { foreignKey: 'news_id' })
    }

    return News;
};