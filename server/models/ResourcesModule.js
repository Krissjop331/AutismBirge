module.exports = (sequelize, DataTypes) => {
    const ResourcesModule = sequelize.define("ResourcesModule", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        // type: {
        //     type: DataTypes.STRING(50),
        //     max: 50
        // },
        module: {
            type: DataTypes.STRING(50),
            max: 50,
            allowNull: false
        }
        
    }, {
        tableName: 'resources_module',
        timestamps: false
    });

    ResourcesModule.associate = function(models) {
        ResourcesModule.hasMany(models.Resources, { foreignKey: "module_id" });
    }

    return ResourcesModule;
};