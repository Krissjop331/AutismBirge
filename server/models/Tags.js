module.exports = (sequelize, DataTypes) => {
    const Tags = sequelize.define("Tags", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(50),
            max: 50
        },
    }, {
        tableName: 'tags',
        timestamps: false
    });

    Tags.associate = function(models) {
        // Tags.belongsToMany(models.News, { through: 'news_tags', timestamps: false, foreignKey: 'tag_id' });
        Tags.hasMany(models.NewsTags, { foreignKey: 'tag_id' });

        Tags.hasMany(models.Posts, { foreignKey: "post_id" });
        // Tags.hasMany(models.Forum, { foreignKey: "forum_id" });
        Tags.hasMany(models.Forum, { foreignKey: "tags_id" });

        Tags.hasMany(models.ArticlesTags, { foreignKey: "tags_id" });
    }

    return Tags;
};