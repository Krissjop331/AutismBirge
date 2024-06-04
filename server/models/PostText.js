module.exports = (sequelize, DataTypes) => {
    const PostText = sequelize.define("PostText", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT
        },
    }, {
        tableName: 'post_text',
        timestamps: false
    });

    PostText.associate = function(models) {
        PostText.hasMany(models.Posts, { foreignKey: "text_id" });
    }

    return PostText;
};