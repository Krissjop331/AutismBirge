module.exports = (sequelize, DataTypes) => {
    const CoursesTestQuestions = sequelize.define("CoursesTestQuestions", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT
        },
    }, {
        tableName: 'courses_test_questions',
        timestamps: false
    });

    CoursesTestQuestions.associate = function(models) {
        CoursesTestQuestions.belongsTo(models.CoursesTest, { foreignKey: "test_id" });
        CoursesTestQuestions.hasMany(models.CoursesTestAnswer, { foreignKey: "questions_id" });
    }

    return CoursesTestQuestions;
};