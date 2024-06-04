module.exports = (sequelize, DataTypes) => {
    const CoursesTest = sequelize.define("CoursesTest", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        // questions: {
        //     type: DataTypes.STRING(150),
        //     require: true,
        // },
        // answer: {
        //     type: DataTypes.STRING(150),
        //     require: true,
        //     max: 50
        // },
        score: {
            type: DataTypes.INTEGER
        },
        time_test_end: {
            type: DataTypes.DATE
        },
        is_closed: {
            type: DataTypes.BOOLEAN
        }
    }, {
        tableName: 'courses_test',
        timestamps: false
    });

    CoursesTest.associate = function(models) {
        CoursesTest.belongsTo(models.CoursesType, { foreignKey: "type_id" });
        CoursesTest.hasMany(models.CoursesTestQuestions, { foreignKey: "test_id" });
        CoursesTest.hasMany(models.CoursesTestResult, { foreignKey: "test_id" });
        CoursesTest.belongsTo(models.Courses, { foreignKey: "courses_id" })
    }

    return CoursesTest;
};