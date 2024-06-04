module.exports = (sequelize, DataTypes) => {
    const ResourcesType = sequelize.define("ResourcesType", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING(50),
            max: 50
        },
        // module: {
        //     type: DataTypes.STRING(50),
        //     max: 50,
        //     allowNull: false
        // }
        
    }, {
        tableName: 'resources_type',
        timestamps: false
    });

    ResourcesType.associate = function(models) {
        ResourcesType.hasMany(models.Resources, { foreignKey: "type_id" });
    }

    return ResourcesType;
};