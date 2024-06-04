module.exports = (sequelize, DataTypes) => {
    const DislikesForum = sequelize.define("DislikesForum", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
    }, {
        tableName: 'dislike_forum',
        timestamps: false
    });

    DislikesForum.associate = function(models) {
        // Dislikes.belongsTo(models.User, { as: 'disliked_user', foreignKey: 'disliked_user_id' }); 
        // Dislikes.belongsTo(models.User, { as: 'dislikedByUserAssociation', foreignKey: 'disliked_by_user' });
        DislikesForum.belongsTo(models.User, { as: 'users', foreignKey: 'user_id' }); 
        DislikesForum.belongsTo(models.Forum, { as: 'forum', foreignKey: 'forum_id' });
    }

    return DislikesForum;
};