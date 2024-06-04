
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('doctor_users', [
            {
                specialization: "Neuropatolog",
                doctor_id: 7,
                child_id: 3,
            },
            {
                specialization: "Neuropatolog",
                doctor_id: 7,
                child_id: 4,
            },

            // DOCTOR 2
            {
                specialization: "Психолог",
                doctor_id: 8,
                child_id: 3,
            },
            {
                specialization: "Психолог",
                doctor_id: 8,
                child_id: 4,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('doctor_users', null, {});
    }
};