module.exports = (sequelize, DataTypes) => {
    const DislikesTopics = sequelize.define("DislikesTopics", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
    }, {
        tableName: 'dislike_topics',
        timestamps: false
    });

    DislikesTopics.associate = function(models) {
        // Dislikes.belongsTo(models.User, { as: 'disliked_user', foreignKey: 'disliked_user_id' }); 
        // Dislikes.belongsTo(models.User, { as: 'dislikedByUserAssociation', foreignKey: 'disliked_by_user' });
        DislikesTopics.belongsTo(models.User, { as: 'users', foreignKey: 'user_id' }); 
        DislikesTopics.belongsTo(models.Topics, { as: 'topics', foreignKey: 'topics_id' });
    }

    return DislikesTopics;
};