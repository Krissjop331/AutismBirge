let title1 = "topics1";
let title2 = "topics2";
let title3 = "topics3";
let title4 = "topics4";
let title5 = "topics5";
let title6 = "topics6";


module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('topics', [
            {
                title: "topics1",
                slug: title1.replace(/\s+/g, '-').toLowerCase(),
                description: "DESCRIPTION 1",
                likes: 0,
                dislikes: 0,
                looked: 0,
                createdAt: new Date(),
                updatedAt: new Date(), 
                author_id: 1,
                forum_id: 1,
                status: "open"
            },
            {
                title: "topics2",
                slug: title2.replace(/\s+/g, '-').toLowerCase(),
                description: "DESCRIPTION 2",
                likes: 23,
                dislikes: 50,
                looked: 1000,
                createdAt: new Date(),
                updatedAt: new Date(), 
                author_id: 2,
                forum_id: 2,
                status: "open"
            },
            {
                title: "topics3",
                slug: title3.replace(/\s+/g, '-').toLowerCase(),
                description: "DESCRIPTION 3",
                likes: 556,
                dislikes: 677,
                looked: 3543,
                createdAt: new Date(),
                updatedAt: new Date(), 
                author_id: 3,
                forum_id: 3,
                status: "open"
            },
            {
                title: "topics4",
                slug: title4.replace(/\s+/g, '-').toLowerCase(),
                description: "DESCRIPTION 4",
                likes: 45446,
                dislikes: 4564,
                looked: 45643,
                createdAt: new Date(),
                updatedAt: new Date(), 
                author_id: 5,
                forum_id: 4,
                status: "close"
            },
            {
                title: "topics5",
                slug: title5.replace(/\s+/g, '-').toLowerCase(),
                description: "DESCRIPTION 5",
                likes: 12315,
                dislikes: 12876,
                looked: 5,
                createdAt: new Date(),
                updatedAt: new Date(), 
                author_id: 7,
                forum_id: 5,
                status: "close"
            },
            {
                title: "topics6",
                slug: title6.replace(/\s+/g, '-').toLowerCase(),
                description: "DESCRIPTION 6",
                likes: 123,
                dislikes: 654,
                looked: 3,
                createdAt: new Date(),
                updatedAt: new Date(), 
                author_id: 5,
                forum_id: 1,
                status: "open"
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('topics', null, {});
    }
};