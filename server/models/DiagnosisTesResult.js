module.exports = (sequelize, DataTypes) => {
    const DiagnosisTestResult = sequelize.define("DiagnosisTestResult", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        result_count: {
            type: DataTypes.INTEGER,
        },
        completed: {
            type: DataTypes.BOOLEAN,
        }
    }, {
        tableName: 'diagnosis_test_result',
    });

    DiagnosisTestResult.associate = function(models) {
        DiagnosisTestResult.belongsTo(models.DiagnosisTest, { foreignKey: "test_id" });
        DiagnosisTestResult.belongsTo(models.User, { foreignKey: "user_id" });
        DiagnosisTestResult.hasMany(models.UserDiagnosis, { foreignKey: "user_diagnosis_id" });
    }

    return DiagnosisTestResult;
};