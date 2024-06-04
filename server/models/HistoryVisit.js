module.exports = (sequelize, DataTypes) => {
    const HistoryVisit = sequelize.define("HistoryVisit", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'history_visit'
    });

    HistoryVisit.associate = function(models) {
        // HistoryVisit.belongsTo(models.ActionType, { foreignKey: "action_type_id" });
        HistoryVisit.belongsTo(models.User, { foreignKey: "user_id" });
    }

    return HistoryVisit;
};