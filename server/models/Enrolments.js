// Число поступающих, то есть кто записан на курс

module.exports = (sequelize, DataTypes) => {
    const Enrolments = sequelize.define("Enrolments", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        // Статус - прошел, не прошел, проходит
        status: {
            type: DataTypes.STRING
        },
        // сколько прошел
        completed_count: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'enrolments',
        timestamps: false
    });

    Enrolments.associate = function(models) {
        Enrolments.belongsTo(models.User, { foreignKey: "user_id" });
        Enrolments.belongsTo(models.CoursesTest, { foreignKey: "test_id" });
    }

    return Enrolments;
};