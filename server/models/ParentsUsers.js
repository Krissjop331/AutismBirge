module.exports = (sequelize, DataTypes) => {
    const ParentsUsers = sequelize.define("ParentsUsers", {
        parent: {
            type: DataTypes.STRING(50)
        }
    }, {
        timestamps: false,
        tableName: 'parents_users'
    });

    return ParentsUsers;
};