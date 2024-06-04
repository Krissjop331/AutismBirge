module.exports = (sequelize, DataTypes) => {
    const CoursesType = sequelize.define("CoursesType", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING(150),
        },
    }, {
        tableName: 'courses_type',
        timestamps: false
    });

    CoursesType.associate = function(models) {
        CoursesType.hasMany(models.CoursesTest, { foreignKey: "type_id" });
    }

    return CoursesType;
};