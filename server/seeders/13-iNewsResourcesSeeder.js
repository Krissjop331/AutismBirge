
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('news_resources', [
            {
                title: "Программа круглого стола",
                url: '../client/public/stories/files/resources/resources/Программа круглого стола 2504.pdf',
                type: "file"
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('news', null, {});
    }
};