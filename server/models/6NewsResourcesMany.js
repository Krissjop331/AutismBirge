module.exports = (sequelize, DataTypes) => {
    const NewsResourcesMany = sequelize.define("NewsResourcesMany", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }
    }, {
        tableName: 'news_resources_many',
        timestamps: false
    });

    NewsResourcesMany.associate = function(models) {
        NewsResourcesMany.belongsTo(models.News, { foreignKey: 'news_id' });
        NewsResourcesMany.belongsTo(models.NewsResources, { foreignKey: 'resources_id' });
    }

    return NewsResourcesMany;
};