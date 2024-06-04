module.exports = (sequelize, DataTypes) => {
    const FeaturedCourses = sequelize.define("FeaturedCourses", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
    }, {
        tableName: 'featured_courses',
        timestamps: false
    });

    FeaturedCourses.associate = function(models) {
        FeaturedCourses.belongsTo(models.User, { foreignKey: "user_id" });
        FeaturedCourses.belongsTo(models.Courses, { foreignKey: "courses_id" });
    }

    return FeaturedCourses;
};