
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('resources_module', [
            {
                module: "Для родителей и ребенка",
            },
            {
                module: "Для учителей",
            },
            {
                module: "Для пользователя",
            },
            {
                module: "Для студента",
            },
            {
                module: "Для мед. специалиста",
            },
            {
                module: "Контакты"
            },
            {
                module: "Шкала"
            },
            {
                module: "МЕТОДИЧЕСКИЕ РЕКОМЕНДАЦИИ"
            },
            {
                module: "Другое"
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('resources_module', null, {});
    }
};