module.exports = (sequelize, DataTypes) => {
    const CommentTopics = sequelize.define("CommentTopics", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        dislikes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        file_patch: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'comment_topics'
    });


    CommentTopics.associate = function(models) {
        CommentTopics.belongsTo(models.User, { foreignKey: "author_id" });
        // CommentTopics.belongsToMany(models.CommentTMany, { as: 'comment_topics', foreignKey: 'comment_topics_id', through: 'CommentTMany', onDelete: 'CASCADE'  }); 
        CommentTopics.hasMany(models.CommentTMany, { foreignKey: "comment_topics_id" });
    }

    return CommentTopics;
};