module.exports = (sequelize, DataTypes) => {
    const Topics = sequelize.define("Topics", {
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
        slug: {
            type: DataTypes.STRING(50),
            max: 50
        },
        description: {
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
        status: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'topics'
    });


    Topics.associate = function(models) {
        Topics.belongsTo(models.Forum, { foreignKey: "forum_id" });
        Topics.belongsTo(models.User, { foreignKey: "author_id" });
        // Topics.belongsTo(models.CommentTopics, { foreignKey: "comment_id" });
        // Topics.belongsToMany(models.CommentTMany, {  as: 'topics', foreignKey: 'topics_id', through: 'CommentTMany', onDelete: 'CASCADE'  }); 
        Topics.hasMany(models.CommentTMany, { foreignKey: "topics_id" });
        // LIKES
        Topics.hasMany(models.LikesTopics, { foreignKey: "topics_id" });
        Topics.hasMany(models.DislikesTopics, { foreignKey: "topics_id" });
    }

    return Topics;
};