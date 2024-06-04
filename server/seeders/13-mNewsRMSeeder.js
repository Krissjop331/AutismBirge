
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('news_resources_many', [
            {
                resources_id: 1,
                news_id: 1,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('news_resources_many', null, {});
    }
};