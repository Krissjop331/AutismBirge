module.exports = (sequelize, DataTypes) => {
    const NewsTags = sequelize.define("NewsTags", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }
    }, {
        tableName: 'news_tags',
        timestamps: false
    });

    NewsTags.associate = function(models) {
        NewsTags.belongsTo(models.Tags, { foreignKey: 'tag_id' });
        NewsTags.belongsTo(models.News, { foreignKey: 'news_id' });
    }

    return NewsTags;
};