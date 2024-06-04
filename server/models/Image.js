module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("Image", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
        },
    }, {
        tableName: 'image'
    });

    return Image;
};