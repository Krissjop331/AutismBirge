module.exports = (sequelize, DataTypes) => {
    const Courses = sequelize.define("Courses", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(150),
            require: true,
        },
        description: {
            type: DataTypes.TEXT,
            require: true,
            max: 50
        },
        main_img: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'courses'
    });

    Courses.associate = function(models) {
        Courses.hasMany(models.CoursesModule, {foreignKey: 'courses_id'});
        Courses.hasMany(models.FeaturedCourses, { foreignKey: 'courses_id' });
        Courses.hasMany(models.CoursesTest, { foreignKey: "courses_id" })
    }

    return Courses;
};