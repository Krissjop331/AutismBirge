module.exports = (sequelize, DataTypes) => {
    const DiagnosisTestAnswer = sequelize.define("DiagnosisTestAnswer", {
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
        is_correct: {
            type: DataTypes.BOOLEAN
        }
    }, {
        tableName: 'diagnosis_test_answer_option',
        timestamps: false
    });

    DiagnosisTestAnswer.associate = function(models) {
        DiagnosisTestAnswer.hasMany(models.DiagnosisTestQuestions, { foreignKey: "question_id" });
    }

    return DiagnosisTestAnswer;
};