module.exports = (sequelize, DataTypes) => {
    const CommentPost = sequelize.define("CommentPost", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT
        },
        likes: {
            type: DataTypes.INTEGER
        },
        dislikes: {
            type: DataTypes.INTEGER
        },
        looked: {
            type: DataTypes.INTEGER
        },
    }, {
        tableName: 'comment_post'
    });

    CommentPost.associate = function(models) {
        CommentPost.belongsTo(models.User, { foreignKey: 'author_id' })
        CommentPost.hasMany(models.Posts, { foreignKey: 'post_id' })
    }

    return CommentPost;
};