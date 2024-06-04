module.exports = (sequelize, DataTypes) => {
    const Forum = sequelize.define("Forum", {
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
        // likes: {
        //     type: DataTypes.INTEGER
        // },
        // dislikes: {
        //     type: DataTypes.INTEGER
        // },
        looked: {
            type: DataTypes.INTEGER
        },
        // status: {
        //     type: DataTypes.STRING
        // }
    }, {
        tableName: 'forum'
    });

    Forum.associate = function(models) {
        Forum.hasMany(models.Topics, { foreignKey: "forum_id" });
        Forum.hasMany(models.FeaturedForum, { foreignKey: 'featured_forum_id' })
        Forum.belongsTo(models.Tags, { foreignKey: "tags_id" });
        Forum.belongsTo(models.User, { foreignKey: "author_id" })

        // LIKES AND DISLIKES
        Forum.hasMany(models.LikesForum, { foreignKey: "forum_id" });
        Forum.hasMany(models.DislikesForum, { foreignKey: "forum_id" });
    }

    return Forum;
};