module.exports = (sequelize, DataTypes) => {
    const FeaturedForum = sequelize.define("FeaturedForum", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
    }, {
        tableName: 'featured_forum',
        timestamps: false
    });

    FeaturedForum.associate = function(models) {
        FeaturedForum.belongsTo(models.User, { foreignKey: "user_id" });
        FeaturedForum.belongsTo(models.Forum, { foreignKey: "forum_id" });
    }

    return FeaturedForum;
};