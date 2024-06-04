module.exports = (sequelize, DataTypes) => {
    const LikesForum= sequelize.define("LikesForum", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
    }, {
        tableName: 'like_forum',
        timestamps: false
    });

    LikesForum.associate = function(models) {
        // LikesForum.belongsTo(models.User, { as: 'liked_user', foreignKey: 'liked_user_id' }); 
        // LikesForum.belongsTo(models.User, { as: 'likedByUserAssociation', foreignKey: 'liked_by_user' });
        LikesForum.belongsTo(models.User, { as: 'users', foreignKey: 'user_id' }); 
        LikesForum.belongsTo(models.Forum, { as: 'forum', foreignKey: 'forum_id' });

    }

    return LikesForum;
};