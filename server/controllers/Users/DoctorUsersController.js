
const CustomError = require('../../Errors/errors');
const db = require("../../models/index");
const User = db.User;
const Role = db.Role;
const DoctorUser = db.DoctorUser;


class DoctorUsersController {

    async getAll(req, res) {
        try {
            const doctorUsers = await DoctorUser.findAll();
            if (!doctorUsers || doctorUsers.length === 0) {
                return res.status(404).json({ message: "Пользователи не найдены", status: 404, doctorUsers });
            }
    
            const doctorIds = doctorUsers.map(doctorUser => doctorUser.doctor_id);
            const childIds = doctorUsers.map(doctorUser => doctorUser.child_id);
    
            const doctors = await User.findAll({ where: { id: doctorIds } });
            const users = await User.findAll({ where: { id: childIds } });
    
            return res.status(200).json({ message: "Получены пользователи", status: 200, doctorUsers, doctors, users });
        } catch (error) {
            console.error("Ошибка на сервере", error);
            return CustomError.handleInternalServerError(res, "Ошибка на сервере", 500);
        }
    }

    async getId(req, res) {
        const { id } = req.params || req.body || req.query;
        if (!id) {
            return CustomError.handleInvalidData(res, "Не передан пользователь");
        }
        let type = req.body.type || req.params.type || "doctor";
        let doctorUser;

        try {
            if (type === 'doctor') {
                doctorUser = await DoctorUser.findAll({
                    where: { doctor_id: id },
                });

                const doctorIds = doctorUser.map(doctorUser => doctorUser.doctor_id);
                const childIds = doctorUser.map(doctorUser => doctorUser.child_id);
                const doctors = await User.findAll({ where: { id: doctorIds } });
                const users = await User.findAll({ where: { id: childIds } });

                return res.status(200).json({ message: "Получены пользователи", doctors, users });
            } else if (type === "users" || type === "child") {
                doctorUser = await DoctorUser.findAll({
                    where: { child_id: id },
                });

                const doctorIds = doctorUser.map(doctorUser => doctorUser.doctor_id);
                const childIds = doctorUser.map(doctorUser => doctorUser.child_id);
                const doctors = await User.findAll({ where: { id: doctorIds } });
                const users = await User.findAll({ where: { id: childIds } });

                return res.status(200).json({ message: "Получены пользователи", doctors, users });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Произошла ошибка", error: error.message });
        }

        if (!doctorUser) {
            return CustomError.handleNotFound(res, "Доктор либо пациент не найдены");
        }

        return res.status(200).json({ message: "Пользователи получены", doctorUser });
    }

    async create(req, res) {
        const { user_id, doctor_id } = req.body;
        try {
            if (!user_id || !doctor_id) {
                return CustomError.handleNotFound(res, "Не передан пользователь или доктор");
            }

            const doctor = await User.findOne({ where: { id: doctor_id }, include: [{ model: Role }] });
            const child = await User.findOne({ where: { id: user_id }, include: [{ model: Role }] });
            if (!doctor || !child) {
                return CustomError.handleNotFound(res, "Пользователь или доктор не найден");
            }

            const doctorRole = doctor.Role.name;
            if (doctorRole !== 'doctor') {
                return CustomError.handleInvalidData(res, "Пользователь не является доктором");
            }
            const doctorUser = await DoctorUser.create({
                child_id: user_id,
                doctor_id,
                specialization: req.body.specialization || null
            });
            if (!doctorUser) {
                return res.status(500).json({ message: "Ошибка добавления доктора к ребенку" });
            }

            return res.status(201).json({ message: "Доктор успешно добавлен к ребенку", status: 200, doctorUser, doctor, child });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Произошла ошибка", error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { user_id, doctor_id, specialization } = req.body;
            if (!user_id || !doctor_id) {
                return CustomError.handleInvalidData(res, "Не переданы все необходимые данные");
            }

            let doctorUser = await DoctorUser.findOne({
                where: {
                    child_id: user_id,
                    doctor_id: doctor_id
                }
            });

            const doctorRole = await User.findOne({where: {id: doctor_id}, include: [{model: Role}]});
            if (!doctorUser) {
                if(doctorRole.Role.name !== 'doctor') {
                    return res.status(403).json({message: "Данный пользователь не является доктором"})
                }
                doctorUser = await DoctorUser.create({
                    child_id: user_id,
                    doctor_id: doctor_id,
                    specialization: specialization || null
                });
    
                return res.status(201).json({ message: "Ребенок успешно добавлен к доктору", doctorUser });
            }
    
            if (doctorUser.child_id !== user_id || doctorUser.doctor_id !== doctor_id) {
                return CustomError.handleInvalidData(res, "Нельзя изменить идентификаторы пользователя и врача, так как доктор уже привязан к этому ребенку");
            }
            doctorUser.specialization = specialization || null;
            await doctorUser.save();
    
            return res.status(200).json({ message: "Запись DoctorUser успешно обновлена", doctorUser });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Произошла ошибка", error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { user_id, doctor_id } = req.body;
            if (!user_id || !doctor_id) {
                return CustomError.handleInvalidData(res, "Не переданы все необходимые данные");
            }
    

            const doctorUser = await DoctorUser.findOne({
                where: {
                    child_id: user_id,
                    doctor_id: doctor_id
                }
            });
            if (!doctorUser) {
                return CustomError.handleNotFound(res, "Ребенок не является привязанным к этому доктору");
            }
            await doctorUser.destroy();
    
            return res.status(200).json({ message: "Ребенок успешно удален у доктора" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Произошла ошибка", error: error.message });
        }
    }
}

module.exports = new DoctorUsersController();