module.exports = (sequelize, DataTypes) => {
    const NewsResources = sequelize.define("NewsResources", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(80),
        },
        url: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING,
            
        }
    }, {
        tableName: 'news_resources',
        timestamps: false
    });

    NewsResources.associate = function(models) {
        // NewsResources.belongsToMany(models.News, { through: 'news_resources_many', timestamps: false, foreignKey: 'resources_id' });
        NewsResources.hasMany(models.NewsResourcesMany, { foreignKey: "resources_id" })
    }

    return NewsResources;
};