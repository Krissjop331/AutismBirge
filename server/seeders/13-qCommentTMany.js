
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('comment_t_many', [
            {
                status: 1,
                comment_topics_id: 1,
                topics_id: 1
            },
            {
                status: 1,
                comment_topics_id: 2,
                topics_id: 1
            },
            {
                status: 1,
                comment_topics_id: 3,
                topics_id: 1
            },
            {
                status: 1,
                comment_topics_id: 4,
                topics_id: 1
            },
            {
                status: 1,
                comment_topics_id: 4,
                topics_id: 1
            },
            {
                status: 1,
                comment_topics_id: 5,
                topics_id: 1
            },

            // TOPICS 2
            {
                status: 0,
                comment_topics_id: 1,
                topics_id: 2
            },
            {
                status: 1,
                comment_topics_id: 2,
                topics_id: 2
            },
            {
                status: 1,
                comment_topics_id: 3,
                topics_id: 2
            },
            {
                status: 0,
                comment_topics_id: 4,
                topics_id: 2
            },
            {
                status: 1,
                comment_topics_id: 5,
                topics_id: 2
            },

            // TOPICS 3
            {
                status: 0,
                comment_topics_id: 1,
                topics_id: 3
            },
            {
                status: 1,
                comment_topics_id: 2,
                topics_id: 3
            },
            {
                status: 0,
                comment_topics_id: 3,
                topics_id: 3
            },
            {
                status: 0,
                comment_topics_id: 4,
                topics_id: 3
            },
            {
                status: 1,
                comment_topics_id: 5,
                topics_id: 3
            },

            // TOPICS 4
            {
                status: 0,
                comment_topics_id: 1,
                topics_id: 4
            },
            {
                status: 1,
                comment_topics_id: 2,
                topics_id: 4
            },
            {
                status: 1,
                comment_topics_id: 3,
                topics_id: 4
            },
            {
                status: 0,
                comment_topics_id: 4,
                topics_id: 4
            },
            {
                status: 1,
                comment_topics_id: 5,
                topics_id: 4
            },

            // TOPICS 5
            {
                status:0,
                comment_topics_id: 1,
                topics_id: 5
            },
            {
                status: 1,
                comment_topics_id: 2,
                topics_id: 5
            },
            {
                status: 0,
                comment_topics_id: 3,
                topics_id: 5
            },
            {
                status: 0,
                comment_topics_id: 4,
                topics_id: 5
            },
            {
                status: 1,
                comment_topics_id: 5,
                topics_id: 5
            },

            // TOPICS 6
            {
                status: 1,
                comment_topics_id: 1,
                topics_id: 6
            },
            {
                status: 1,
                comment_topics_id: 2,
                topics_id: 6
            },
            {
                status: 1,
                comment_topics_id: 3,
                topics_id: 6
            },
            {
                status: 0,
                comment_topics_id: 4,
                topics_id: 6
            },
            {
                status: 1,
                comment_topics_id: 5,
                topics_id: 6
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('comment_t_many', null, {});
    }
};