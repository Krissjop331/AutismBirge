module.exports = (sequelize, DataTypes) => {
    const CoursesTestAnswer = sequelize.define("CoursesTestAnswer", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT
        },
        is_correct: {
            type: DataTypes.BOOLEAN
        }
    }, {
        tableName: 'courses_test_answer',
        timestamps: false
    });

    CoursesTestAnswer.associate = function(models) {
        CoursesTestAnswer.belongsTo(models.CoursesTestQuestions, { foreignKey: "questions_id" });
    }

    return CoursesTestAnswer;
};