
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('news_tags', [
            {
                tag_id: 10,
                news_id: 1,
            },
            {
                tag_id: 11,
                news_id: 1,
            },
            {
                tag_id: 12,
                news_id: 1,
            },
            {
                tag_id: 13,
                news_id: 1,
            },
            {
                tag_id: 14,
                news_id: 1,
            },
            {
                tag_id: 15,
                news_id: 2
            },
            {
                tag_id: 15,
                news_id: 3
            },
            {
                tag_id: 15,
                news_id: 4
            },
            {
                tag_id: 16,
                news_id: 5
            },
            {
                tag_id: 16,
                news_id: 6
            },
            {
                tag_id: 16,
                news_id: 7
            },
            {
                tag_id: 16,
                news_id: 8
            },
            {
                tag_id: 16,
                news_id: 9
            },
            {
                tag_id: 16,
                news_id: 10
            },
            {
                tag_id: 16,
                news_id: 11
            },
            {
                tag_id: 16,
                news_id: 12
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('news_tags', null, {});
    }
};