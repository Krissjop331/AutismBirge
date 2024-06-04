module.exports = (sequelize, DataTypes) => {
    const DiagnosisTest = sequelize.define("DiagnosisTest", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        total_score: {
            type: DataTypes.INTEGER,
            defaultValue: 100
        }
    }, {
        tableName: 'diagnosis_test',
    });

    DiagnosisTest.associate = function(models) {
        DiagnosisTest.belongsTo(models.DiagnosisTestQuestions, { foreignKey: "question_id" });
        DiagnosisTest.hasMany(models.Diagnosis, { foreignKey: "test_id" });
        DiagnosisTest.hasMany(models.DiagnosisTestResult, { foreignKey: "test_result_id" });
    }

    return DiagnosisTest;
};