
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('tags', [
            {
                title: "Медицина",
            },
            {
                title: "Общество",
            },
            {
                title: "Настроение",
            },
            {
                title: "Сегодня",
            },
            {
                title: "Будни",
            },
            {
                title: "Аутизм",
            },
            {
                title: "Курсы",
            },
            {
                title: "Общение",
            },
            {
                title: "Саморазвитие",
            },
            {
                title: "Инклюзия"
            },
            {
                title: "Социальная адаптация"
            },
            {
                title: "Круглый стол"
            },
            {
                title: "Образование"
            },
            {
                title: "Аутизм"
            },
            {
                title: "Тезисы"
            },
            {
                title: "ВАК"
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('tags', null, {});
    }
};