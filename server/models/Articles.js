module.exports = (sequelize, DataTypes) => {
    const Articles = sequelize.define("Articles", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(50),
            min: 3,
            max: 50
        },
        slug: {
            type: DataTypes.STRING(50),
            min: 3,
            max: 50
        },
        // likes: {
        //     type: DataTypes.INTEGER
        // },
        // dislikes: {
        //     type: DataTypes.INTEGER
        // },
        description: {
            type: DataTypes.TEXT,
        },
        
        looked: {
            type: DataTypes.INTEGER
        },
        blocked: {
            type: DataTypes.BOOLEAN
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'articles'
    });

    Articles.associate = function(models) {
        Articles.belongsTo(models.User, { foreignKey: 'author_id' })
        Articles.hasMany(models.ArticlesTags, { foreignkey: "articles_id" })
        // Posts.belongsTo(models.CommentPost, { foreignKey: 'comment_id' })
        // Posts.hasMany(models.FeaturedPost, { foreignKey: 'featured_posts_id' })

        // Posts.belongsTo(models.Tags, { foreignKey: "tag_id" });
        // Posts.belongsTo(models.PostImage, { foreignKey: "image_id" });
        // Posts.belongsTo(models.PostText, { foreignKey: "text_id" });
        // Posts.belongsTo(models.PostLink, { foreignKey: "link_id" });
        // Posts.belongsTo(models.PostFiles, { foreignKey: "files_id" });
    }

    return Articles;
};