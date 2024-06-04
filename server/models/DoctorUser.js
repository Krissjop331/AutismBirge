module.exports = (sequelize, DataTypes) => {
    const DoctorUser = sequelize.define("DoctorUser", {
        specialization: {
            type: DataTypes.STRING(80)
        }
    }, {
        timestamps: false,
        tableName: 'doctor_users'
    });

    return DoctorUser;
};