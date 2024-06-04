
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('comment_topics', [
            {
                content: "Comment 1",
                likes: 121,
                dislikes: 34,
                createdAt: new Date(),
                updatedAt: new Date(), 
                author_id: 1,
                file_patch: ''
            },
            {
                content: "Comment 2",
                likes: 155,
                dislikes: 36,
                createdAt: new Date(),
                updatedAt: new Date(), 
                author_id: 2,
                file_patch: ''
            },
            {
                content: "Comment 3",
                likes: 7,
                dislikes: 0,
                createdAt: new Date(),
                updatedAt: new Date(), 
                author_id: 3,
                file_patch: 'stories/files/resources/forum'
            },
            {
                content: "Comment 4",
                likes: 121,
                dislikes: 34,
                createdAt: new Date(),
                updatedAt: new Date(), 
                author_id: 4,
                file_patch: ''
            },
            {
                content: "Comment 5",
                likes: 77,
                dislikes: 9,
                createdAt: new Date(),
                updatedAt: new Date(), 
                author_id: 5,
                file_patch: 'stories/files/resources/forum'
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('comment_topics', null, {});
    }
};