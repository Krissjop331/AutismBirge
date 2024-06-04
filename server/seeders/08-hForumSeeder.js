let title1 = "forum1";
let title2 = "forum2";
let title3 = "forum3";
let title4 = "forum4";
let title5 = "forum5";
let title6 = "forum6";


module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('forum', [
            {
                title: "Forum1",
                slug: title1.replace(/\s+/g, '-').toLowerCase(),
                description: "DESCRIPTION 1",
                // likes: 0,
                // dislikes: 0,
                looked: 0,
                createdAt: new Date(),
                updatedAt: new Date(), 
                author_id: 2,
                tags_id: 1
            },
            {
                title: "Forum2",
                slug: title2.replace(/\s+/g, '-').toLowerCase(),
                description: "DESCRIPTION 2",
                // likes: 23,
                // dislikes: 50,
                looked: 1000,
                createdAt: new Date(),
                updatedAt: new Date(), 
                author_id: 2,
                tags_id: 2
            },
            {
                title: "Forum3",
                slug: title3.replace(/\s+/g, '-').toLowerCase(),
                description: "DESCRIPTION 3",
                // likes: 556,
                // dislikes: 677,
                looked: 3543,
                createdAt: new Date(),
                updatedAt: new Date(), 
                author_id: 2,
                tags_id: 3
            },
            {
                title: "Forum4",
                slug: title4.replace(/\s+/g, '-').toLowerCase(),
                description: "DESCRIPTION 4",
                // likes: 45446,
                // dislikes: 4564,
                looked: 45643,
                createdAt: new Date(),
                updatedAt: new Date(), 
                author_id: 2,
                tags_id: 4
            },
            {
                title: "Forum5",
                slug: title5.replace(/\s+/g, '-').toLowerCase(),
                description: "DESCRIPTION 5",
                // likes: 12315,
                // dislikes: 12876,
                looked: 5,
                createdAt: new Date(),
                updatedAt: new Date(), 
                author_id: 2,
                tags_id: 5
            },
            {
                title: "Forum6",
                slug: title6.replace(/\s+/g, '-').toLowerCase(),
                description: "DESCRIPTION 6",
                // likes: 123,
                // dislikes: 654,
                looked: 3,
                createdAt: new Date(),
                updatedAt: new Date(), 
                author_id: 2,
                tags_id: 6
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('forum', null, {});
    }
};