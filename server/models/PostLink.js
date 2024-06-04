module.exports = (sequelize, DataTypes) => {
    const PostLink = sequelize.define("PostLink", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING
        },
    }, {
        tableName: 'post_links',
        timestamps: false
    });

    PostLink.associate = function(models) {
        PostLink.hasMany(models.Posts, { foreignKey: "link_id" });
    }

    return PostLink;
};