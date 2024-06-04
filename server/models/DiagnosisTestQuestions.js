module.exports = (sequelize, DataTypes) => {
    const DiagnosisTestQuestions = sequelize.define("DiagnosisTestQuestions", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        text: {
            type: DataTypes.STRING(100),
            max: 100
        },
        score: {
            type: DataTypes.INTEGER,
        }
    }, {
        tableName: 'diagnosis_test_questions',
        timestamps: false,
    });

    DiagnosisTestQuestions.associate = function(models) {
        DiagnosisTestQuestions.hasMany(models.DiagnosisTest, { foreignKey: "test_id" });
        DiagnosisTestQuestions.belongsTo(models.DiagnosisTestAnswer, { foreignKey: "answer_id" });
    }

    return DiagnosisTestQuestions;
};