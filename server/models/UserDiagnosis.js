module.exports = (sequelize, DataTypes) => {
    const UserDiagnosis = sequelize.define("UserDiagnosis", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        conclusion: {
            type: DataTypes.TEXT,
        },
        status: {
            type: DataTypes.STRING(50),
        }
    }, {
        tableName: 'user_diagnosis',
    });

    UserDiagnosis.associate = function(models) {
        UserDiagnosis.belongsTo(models.User, { foreignKey: "user_id" });
        UserDiagnosis.belongsTo(models.DiagnosisTestResult, {foreignKey: 'test_result_id'});
        UserDiagnosis.belongsTo(models.Diagnosis, {foreignKey: 'diagnosis_id'});
    }

    return UserDiagnosis;
};