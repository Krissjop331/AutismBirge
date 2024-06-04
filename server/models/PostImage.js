module.exports = (sequelize, DataTypes) => {
    const PostImage = sequelize.define("PostImage", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        image_url: {
            type: DataTypes.STRING
        },
    }, {
        tableName: 'post_images',
        timestamps: false
    });

    PostImage.associate = function(models) {
        PostImage.hasMany(models.Posts, { foreignKey: "image_id" });
    }

    return PostImage;
};