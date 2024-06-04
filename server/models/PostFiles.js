module.exports = (sequelize, DataTypes) => {
    const PostFiles = sequelize.define("PostFiles", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        file_patch: {
            type: DataTypes.STRING
        },
    }, {
        tableName: 'post_files',
        timestamps: false
    });

    PostFiles.associate = function(models) {
        PostFiles.hasMany(models.Posts, { foreignKey: "files_id" });
    }

    return PostFiles;
};