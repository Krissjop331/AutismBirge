module.exports = (sequelize, DataTypes) => {
    const CoursesModule = sequelize.define("CoursesModule", {
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
        img: {
            type: DataTypes.STRING
        },
        total_count: {
            type: DataTypes.INTEGER
        },
        current_count: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.BOOLEAN
        }
    }, {
        tableName: 'courses_module',
        timestamps: false
    });

    CoursesModule.associate = function(models) {
        CoursesModule.belongsTo(models.Courses, { foreignKey: "courses_id" });
    }

    return CoursesModule;
};