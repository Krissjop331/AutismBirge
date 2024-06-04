module.exports = {
    async up(queryInterface, Sequelize) {
        const specificDate = new Date(2024, 5, 30); // Месяц апрель (3) и день 27, год 2024

        return queryInterface.bulkInsert('articles_tags', [
            {
                tags_id: 15,
                articles_id: 1
            },
            {
                tags_id: 15,
                articles_id: 2
            },
            {
                tags_id: 15,
                articles_id: 3
            },
            {
                tags_id: 16,
                articles_id: 4
            },
            {
                tags_id: 16,
                articles_id: 5
            },
            {
                tags_id: 16,
                articles_id: 6
            },
            {
                tags_id: 16,
                articles_id: 7
            },
            {
                tags_id: 16,
                articles_id: 8
            },
            {
                tags_id: 16,
                articles_id: 9
            },
            {
                tags_id: 16,
                articles_id: 10
            },
            {
                tags_id: 16,
                articles_id: 11
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('articles_tags', null, {});
    }
};