module.exports = (sequelize, DataTypes) => {
    const CommentTMany = sequelize.define("CommentTMany", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
        }
    }, {
        tableName: 'comment_t_many',
        timestamps: false
    });

    CommentTMany.associate = function(models) {
        CommentTMany.belongsTo(models.Topics, { foreignKey: 'topics_id' });
        CommentTMany.belongsTo(models.CommentTopics, { foreignKey: 'comment_topics_id' });
    }

    return CommentTMany;
};