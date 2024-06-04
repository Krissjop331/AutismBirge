module.exports = (sequelize, DataTypes) => {
    const Resources = sequelize.define("Resources", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
        },
        slug: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.STRING,
        },
        file_patch: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT
        },
        url_description: {
            type: DataTypes.STRING,
        }
    }, {
        tableName: 'resources'
    });

    Resources.associate = function(models) {
        Resources.belongsTo(models.ResourcesType, { foreignKey: "type_id" });
        Resources.belongsTo(models.ResourcesModule, { foreignKey: "module_id" });
    }

    return Resources;
};