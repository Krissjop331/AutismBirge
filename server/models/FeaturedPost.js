module.exports = (sequelize, DataTypes) => {
    const FeaturedPost = sequelize.define("FeaturedPost", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
    }, {
        tableName: 'featured_posts',
        timestamps: false
    });

    FeaturedPost.associate = function(models) {
        FeaturedPost.belongsTo(models.User, { foreignKey: "user_id" });
        FeaturedPost.belongsTo(models.Posts, { foreignKey: "post_id" });
    }

    return FeaturedPost;
};