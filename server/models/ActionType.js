module.exports = (sequelize, DataTypes) => {
    const ActionType = sequelize.define("ActionType", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(50),
            min: 3,
            max: 50
        },
    }, {
        tableName: 'action_type'
    });

    // Тип для истории

    // ActionType.associate = function(models) {
    //     ActionType.hasMany(models.HistoryVisit, { foreignKey: "action_type_id" });
    // }

    return ActionType;
};