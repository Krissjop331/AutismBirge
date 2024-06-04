
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('action_type', [
            {
                title: "Главная_страница",
                createdAt: new Date(),  
                updatedAt: new Date()
            },
            {
                title: "Главная_форум",
                createdAt: new Date(),  
                updatedAt: new Date()
            },
            {
                title: "Форум",
                createdAt: new Date(),  
                updatedAt: new Date()
            },
            {
                title: "Форум_тема",
                createdAt: new Date(),  
                updatedAt: new Date()
            },
            {
                title: "Тема",
                createdAt: new Date(),  
                updatedAt: new Date()
            },
            {
                title: "Сообщение_темы_форума",
                createdAt: new Date(),  
                updatedAt: new Date()
            },
            {
                title: "Главная_пост",
                createdAt: new Date(),  
                updatedAt: new Date()
            },
            {
                title: "Пост",
                createdAt: new Date(),  
                updatedAt: new Date()
            },
            {
                title: "Пост_комментарий",
                createdAt: new Date(),  
                updatedAt: new Date()
            },
            {
                title: "Создание_поста",
                createdAt: new Date(),  
                updatedAt: new Date()
            },
            {
                title: "Редактирование_поста",
                createdAt: new Date(),  
                updatedAt: new Date()
            },
            {
                title: "Ресурсы",
                createdAt: new Date(),  
                updatedAt: new Date()
            },
            {
                title: "Ресурс_файл",
                createdAt: new Date(),  
                updatedAt: new Date()
            },
            {
                title: "Ресурс_видео",
                createdAt: new Date(),  
                updatedAt: new Date()
            },
            {
                title: "Ресурс_изображение",
                createdAt: new Date(),  
                updatedAt: new Date()
            },
            {
                title: "Профиль",
                createdAt: new Date(),  
                updatedAt: new Date()
            },
            {
                title: "Редактирование_профиля",
                createdAt: new Date(),  
                updatedAt: new Date()
            },
            {
                title: "Авторизация",
                createdAt: new Date(),  
                updatedAt: new Date()
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('action_type', null, {});
    }
};