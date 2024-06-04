module.exports = (sequelize, DataTypes) => {
    const FriendsUser = sequelize.define("FriendsUser", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(50),
            defaultValue: "loading"
        }
    }, {
        timestamps: false,
        tableName: 'friends'
    });

    return FriendsUser;
};