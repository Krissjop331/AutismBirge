module.exports = (sequelize, DataTypes) => {
    const ArticlesTags = sequelize.define("ArticlesTags", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }
    }, {
        tableName: 'articles_tags',
        timestamps: false
    });

    ArticlesTags.associate = function(models) {
        ArticlesTags.belongsTo(models.Tags, { foreignKey: 'tags_id' });
        ArticlesTags.belongsTo(models.Articles, { foreignKey: 'articles_id' });
    }

    return ArticlesTags;
};