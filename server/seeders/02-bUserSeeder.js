const bcrypt = require('bcryptjs');

const adminHashPassword = bcrypt.hash("admin1234", 10);
const userHashPassword = bcrypt.hash("user1234", 10);

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('users', [{
                first_name: 'admin',
                last_name: 'admin',
                login: 'admin',
                email: 'admin@mail.ru',
                password: (await adminHashPassword).toString(),
                birthday: "2003-03-18",
                avatar_url: "../client/public/stories/files/resources/users/no-image-svgrepo-com.svg",
                phone_number: '11111111111',
                is_active: false,
                role_id: 2,
                blocked: false,
                status: "true",
                createdAt: new Date(),  
                updatedAt: new Date()
            },
            {
                first_name: 'user',
                last_name: 'user',
                login: 'user',
                email: 'user@mail.ru',
                password: (await userHashPassword).toString(),
                birthday: "2003-03-17",
                avatar_url:"../client/public/stories/files/resources/users/no-image-svgrepo-com.svg",
                phone_number: '22222222222',
                is_active: false,
                role_id: 3,
                blocked: false,
                status: "true",
                createdAt: new Date(),  
                updatedAt: new Date()
            },
            {
                first_name: 'children1',
                last_name: 'children1',
                login: 'children1',
                email: 'children1@mail.ru',
                password: (await userHashPassword).toString(),
                birthday: "2010-03-17",
                avatar_url: "../client/public/stories/files/resources/users/no-image-svgrepo-com.svg",
                phone_number: '22222222222',
                is_active: false,
                role_id: 6,
                blocked: false,
                createdAt: new Date(),  
                updatedAt: new Date(),
                status: "true",
            },
            {
                first_name: 'children2',
                last_name: 'children2',
                login: 'children2',
                email: 'children2@mail.ru',
                password: (await userHashPassword).toString(),
                birthday: "2010-03-17",
                avatar_url: "../client/public/stories/files/resources/users/no-image-svgrepo-com.svg",
                phone_number: '22222222222',
                is_active: false,
                status: "true",
                role_id: 6,
                blocked: false,
                createdAt: new Date(),  
                updatedAt: new Date()
            },
            {
                first_name: 'parents1',
                last_name: 'parents1',
                login: 'parents1',
                email: 'parents1@mail.ru',
                password: (await userHashPassword).toString(),
                birthday: "2010-03-17",
                avatar_url: "../client/public/stories/files/resources/users/no-image-svgrepo-com.svg",
                phone_number: '22222222222',
                is_active: false,
                status: "true",
                role_id: 4,
                blocked: false,
                createdAt: new Date(),  
                updatedAt: new Date()
            },
            {
                first_name: 'parents2',
                last_name: 'parents2',
                login: 'parents2',
                email: 'parents2@mail.ru',
                password: (await userHashPassword).toString(),
                birthday: "2010-03-17",
                avatar_url: "../client/public/stories/files/resources/users/no-image-svgrepo-com.svg",
                phone_number: '22222222222',
                is_active: false,
                role_id: 4,
                blocked: false,
                createdAt: new Date(),  
                updatedAt: new Date()
            },
            {
                first_name: 'doctor1',
                last_name: 'doctor1',
                login: 'doctor1',
                email: 'doctor1@mail.ru',
                password: (await userHashPassword).toString(),
                birthday: "2010-03-17",
                avatar_url: "../client/public/stories/files/resources/users/no-image-svgrepo-com.svg",
                phone_number: '22222222222',
                is_active: false,
                role_id: 5,
                blocked: false,
                createdAt: new Date(),  
                updatedAt: new Date()
            },
            {
                first_name: 'doctor2',
                last_name: 'doctor2',
                login: 'doctor2',
                email: 'doctor2@mail.ru',
                password: (await userHashPassword).toString(),
                birthday: "2010-03-17",
                avatar_url: "../client/public/stories/files/resources/users/no-image-svgrepo-com.svg",
                phone_number: '22222222222',
                is_active: false,
                role_id: 5,
                blocked: false,
                createdAt: new Date(),  
                updatedAt: new Date()
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('users', null, {});
    }
};