module.exports = (sequelize, DataTypes) => {
    const Subscription = sequelize.define("Subscription", {
        status: {
            type: DataTypes.BOOLEAN
        },
        notification: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'subscription'
    });

    return Subscription;
};