module.exports = (sequelize, DataTypes) => {
    const CoursesTestResult = sequelize.define("CoursesTestResult", {
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
        },
        result_count: {
            type: DataTypes.INTEGER
        },
        date_complete: {
            type: DataTypes.DATE
        }
    }, {
        tableName: 'courses_test_result',
        timestamps: false
    });

    CoursesTestResult.associate = function(models) {
        CoursesTestResult.belongsTo(models.User, { foreignKey: "user_id" });
        CoursesTestResult.belongsTo(models.CoursesTest, { foreignKey: "test_id" });
    }

    return CoursesTestResult;
};