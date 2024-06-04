module.exports = (sequelize, DataTypes) => {
    const Diagnosis = sequelize.define("Diagnosis", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            max: 50
        },
        description: {
            type: DataTypes.TEXT
        }
    }, {
        tableName: 'diagnosis',
    });

    Diagnosis.associate = function(models) {
        Diagnosis.belongsTo(models.DiagnosisTest, { foreignKey: "test_id" });
        Diagnosis.hasMany(models.UserDiagnosis, { foreignKey: "user_diagnosis_id" });
    }

    return Diagnosis;
};