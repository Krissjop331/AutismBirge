module.exports = (sequelize, DataTypes) => {
    const LikesTopics= sequelize.define("LikesTopics", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
    }, {
        tableName: 'like_topics',
        timestamps: false
    });

    LikesTopics.associate = function(models) {
        // LikesForum.belongsTo(models.User, { as: 'liked_user', foreignKey: 'liked_user_id' }); 
        // LikesForum.belongsTo(models.User, { as: 'likedByUserAssociation', foreignKey: 'liked_by_user' });
        LikesTopics.belongsTo(models.User, { as: 'users', foreignKey: 'user_id' }); 
        LikesTopics.belongsTo(models.Topics, { as: 'topics', foreignKey: 'topics_id' });
    }

    return LikesTopics;
};