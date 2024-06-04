const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const config = require('../../config/config.json');
const secret = config.secretKey || 'JWTKEY';
const cookie = require("cookie-parser");
const moment = require('moment');

const CustomError = require('../../Errors/errors');
const db = require("../../models/index");
const User = db.User;
const Role = db.Role;

const DoctorUser = db.DoctorUser;
const ParentsUsers = db.ParentsUsers;

const generateToken = (id, roles) => {
    const payload = {
        id,
        roles
    };

    return jwt.sign(payload, secret, { expiresIn: "100h" });
}




// Написать что при подтверждении или отклонении регистрации пользователя менялась и роль по параметру или req.body?
// Если регистрирует админ он изначально может подтвердить пользователя

class AuthController {
    async test(req, res) {
        return res.status(200).json({message: "TEST"})
    }

    async refreshTokenIfActive(req, res) {
        try {
            if (req.tokenExpired) {
                const decoded = req.user;
                const user = await User.findOne({ id: decoded.id });
                if (!user) {
                    return res.status(401).json({ message: "User not found", status: 401 });
                }
                const roles = await Role.findOne({where: {id: user.role_id}})
                const newToken = generateToken(user.id, roles.name);
                req.headers.authorization = `Bearer ${newToken}`;
                res.cookie('authorization', `Bearer ${newToken}`, { expires: new Date(Date.now() + 60 * 60 * 1000) });
                return res.json({ token: `Bearer ${newToken}`, roles: roles });
            } else {
                const authHeader = req.headers.authorization;
                if (authHeader && authHeader.startsWith("Bearer ")) {
                    const token = authHeader.split(" ")[1];
                    jwt.verify(token, secret, async (err, decoded) => {
                        if (!err) {
                            const user = await User.findOne({ id: decoded.id });
                            const newToken = generateToken(user.id, user.role_id);
                            req.headers.authorization = `Bearer ${newToken}`;
                            res.cookie('authorization', `Bearer ${newToken}`, { expires: new Date(Date.now() + 60 * 60 * 1000) });
                            return res.json({ token: `Bearer ${newToken}` });
                        } else {
                            return res.status(401).json({ message: "Invalid token", status: 401 });
                        }
                    });
                } else {
                    return res.status(401).json({ message: "No token provided", status: 401 });
                }
            }
        } catch (error) {
            console.error(`Error refreshing token: ${error.message}`);
            return res.status(500).json({ message: `Error refreshing token: ${error.message}`, status: 500 });
        }
    } 

    async signUp(req, res) {
        try {
            const authToken = req.headers.authorization.split(" ")[1] || '';
            if (!req.body || !req.params) {
                return CustomError.handleNotFound(res, "Вы не авторизованы", 400);
            }
            // const errors = validationResult(req);
            // if(!errors.isEmpty()) {
            //     return res.status(400).json({ errors: errors.array() });
            // }
            if(authToken !== '' || authToken != undefined) {
                const { id } = jwt.verify(authToken, secret);
                const user = await User.findOne({
                    where: {id: id},
                    include: [{
                        model: Role
                }]});

                const users = await User.findAll();
                const userLength = users.length + 1;
                const userEmail = await User.findOne({where: { email: req.body.email }});
                const userLogin = await User.findOne({where: { login: req.body.login }});
                if (userEmail) {
                    delete req.body.email;
                    delete req.body.password;
                    delete req.body.login;
                    return CustomError.handleDuplicateResource(res, "Данный пользователь c таким email уже существует", 409);
                }
                if (userLogin) {
                    delete req.body.email;
                    delete req.body.password;
                    delete req.body.login;
                    return CustomError.handleDuplicateResource(res, "Данный пользователь c таким логином уже существует", 409);
                }

                let userCreate;
                const hashPassword = bcrypt.hashSync(req.body.password, 8);
                const role = await Role.findOne({name: "unknow"});
                const token = generateToken(userLength, role.name || "unknow");
                req.headers.authorization = "Bearer" + " " + token;
                res.cookie('authorization', "Bearer" + ' ' + token, { expires: new Date(Date.now() + 60 + 60 + 1000) });
                if(user.Role.name === "admin") {    
                    userCreate = await User.create({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        login: req.body.login,
                        // avatar_url: req.file?.path || req.body.file?.path || '',
                        avatar_url: req.file?.path.replace(/\\/g, "/") || req.body.file?.path || '',
                        birthday: req.body.birthday,
                        phone_number: req.body.phone_number || '',
                        password: hashPassword,
                        is_active: false,
                        status: req.body.status || "loading",
                        blocked: req.body.blocked || false,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        role_id: req.body.role_id || role.id || 1
                    })

                    let doctor;
                    let parents;
                    if (req.params.doctor_id || req.body.doctor_id || req.query.doctor_id) {
                        const doctorId = req.params.doctor_id || req.body.doctor_id || req.query.doctor_id;
                        const checkdoctor = await User.findOne({ where: { id: doctorId }, include: [{ model: Role }] });
                        if (checkdoctor && checkdoctor.Role.name === "doctor") {
                            const duplicateDoctor = await DoctorUser.findOne({ where: { doctor_id: doctorId, child_id: userLength } });
                            if (duplicateDoctor) {
                                return CustomError.handleDuplicateResource(res, "Данный доктор уже привязан к этому пользователю", 409);
                            }
                            doctor = await DoctorUser.create({ doctor_id: doctorId, child_id: userLength, specialization: req.body.specialization || "Doctor" });
                        } else if (checkdoctor) {
                            return res.status(409).json({ message: "Данный пользователь не является доктором", status: 409 });
                        } else {
                            return res.status(404).json({ message: "Пользователя не существует", status: 404 });
                        }
                    }
                    
                    if (req.params.parent_id || req.body.parent_id || req.query.parent_id) {
                        const parentId = req.params.parent_id || req.body.parent_id || req.query.parent_id;
                        const parentUser = await User.findOne({ where: { id: parentId }, include: [{ model: Role }] });
                        if (parentUser) {
                            parents = await ParentsUsers.create({ parent_id: parentId, child_id: userLength });
                        } else {
                            return res.status(404).json({ message: "Пользователя не существует", status: 404 });
                        }
                    }
                } else {
                    userCreate = await User.create({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        login: req.body.login,
                        avatar_url: req.file || "",
                        birthday: req.body.birthday,
                        phone_number: req.body.phone_number || undefined,
                        password: hashPassword,
                        is_active: false,
                        status: 'loading',
                        blocked: false,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        role_id: role.id || 1 || undefined
                    })
                } 
                if(!userCreate) {
                    return res.status(400).json({status: 400, message: "Пользователя не удалось создать"})
                }
    
                delete req.body.first_name;
                delete req.body.password;
                delete req.body.email;
                delete req.body.password;
                delete req.body.login;
                delete req.body.phone_number;
                delete req.body.birthday;

                return res.status(200).json({status: 201, message: "Пользователь успешно создан", users: userCreate, token: req.headers.authorization})
            } else {
                return res.status(403).json({ message: "Вы не авторизованы", status: 403});
            }
        } catch (error) {
            console.error("Ошибка на сервере", error);
            return CustomError.handleInternalServerError(res, "Ошибка на сервере", 500);
        }
    }

    async signIn(req, res) {
        try {
            if (!req.body) {
                return CustomError.handleNotFound(res, "Данных нет", 400);
            }
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({ errors: errors.array() });
            // }

            let where = {};
            if(req.body.login) where.login = req.body.login
            if(req.body.email) where.email = req.body.email
            const user = await User.findOne({
                // where: {email: req.body.email},
                where,
                include: [{
                    model: Role
                }]
            }) 
            if(!user) {
                delete req.body.email;
                delete req.body.password;
                return res.status(404).json({ message: `Пользователя не существует`, status: 404 });
            }

            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                delete req.body.email;
                delete req.body.password;
                return res.status(409).json({ message: "Неправильный пароль", status: 409 });
            }

            if(user.blocked && user.blocked === true) {
                delete req.body.email;
                delete req.body.password;
                return CustomError.handleBlockedResource(res, "Вы заблокированы. Доступ запрещен", 403)
            }
            if(user.status == "loading" || user.status == "false") {
                delete req.body.email;
                delete req.body.password;
                return CustomError.handleBlockedResource(res, "Вы не зарегестрированы", 403)
            }

            const role = await Role.findOne({where: {id: user.role_id}});
            const token = generateToken(user.id, role.name);
            req.headers.authorization = "Bearer" + " " + token;
            res.cookie('authorization', "Bearer" + ' ' + token, { expires: new Date(Date.now() + 60 + 60 + 1000) });

            delete req.body.username;
            delete req.body.password;

            return res.status(201).json({ message: "Вы авторизированы", status: 201, token: req.headers.authorization, user});
        } catch (error) {
            console.error("Ошибка на сервере", error);
            return CustomError.handleInternalServerError(res, "Ошибка на сервере", 500);
        }
    }

    async signOut(req, res) {
        try {
            let token;
            if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
                token = req.headers.authorization.split(' ')[1];
            }
            else if (req.cookies && req.cookies.authorization) {
                token = req.cookies.authorization.split(' ')[1];
            }
            if (token) {
                res.clearCookie('authorization');
                res.setHeader('Authorization', '');
                return res.status(201).json({ message: "Токен успешно удален", status: 201 });
            } else {
                return res.status(401).json({ message: "Токен не найден", status: 401 });
            }
        } catch (error) {
            console.error("Ошибка на сервере", error);
            return CustomError.handleInternalServerError(res, "Ошибка на сервере", 500);
        }
    }

    async confirmed(req, res) {
        try {
            const { id } = req.params;
            if (!req.body && !id) {
                return CustomError.handleNotFound(res, "Данных нет", 400);
            }

            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "Пользователь не найден", status: 404 });
            }
            user.status = req.body.status;
            user.role_id = req.body.role_id;
            await user.save();
            let doctor;
            let parents;

            if (req.params.doctor_id || req.body.doctor_id || req.query.doctor_id) {
                const doctorId = req.params.doctor_id || req.body.doctor_id || req.query.doctor_id;
                const checkdoctor = await User.findOne({ where: { id: doctorId }, include: [{ model: Role }] });
                if (checkdoctor && checkdoctor.Role.name === "doctor") {
                    const duplicateDoctor = await DoctorUser.findOne({ where: { doctor_id: doctorId, child_id: user.id } });
                    if (duplicateDoctor) {
                        return CustomError.handleDuplicateResource(res, "Данный доктор уже привязан к этому пользователю", 409);
                    }
                    doctor = await DoctorUser.create({ doctor_id: doctorId, child_id: user.id });
                } else if (checkdoctor) {
                    return res.status(409).json({ message: "Данный пользователь не является доктором", status: 409 });
                } else {
                    return res.status(404).json({ message: "Пользователя не существует", status: 404 });
                }
            }
            
            if (req.params.parent_id || req.body.parent_id || req.query.parent_id) {
                const parentId = req.params.parent_id || req.body.parent_id || req.query.parent_id;
                const parentUser = await User.findOne({ where: { id: parentId }, include: [{ model: Role }] });
                if (parentUser) {
                    parents = await ParentsUsers.create({ parent_id: parentId, child_id: user.id });
                } else {
                    return res.status(404).json({ message: "Пользователя не существует", status: 404 });
                }
            }
            
            return res.status(200).json({
                message: "Статус пользователя обновлен",
                status: 200,
                user,
                doctor_user: doctor || '',
                parents_user: parents || ''
            });
        } catch (error) {
            console.error("Ошибка на сервере", error);
            return CustomError.handleInternalServerError(res, "Ошибка на сервере", 500);
        }
    }

    async isActiveUser(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            let id;

            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    console.error("Ошибка при верификации токена:", err);
                    return res.status(409).json({message: "Ошибка при верификации токена:", status: 409})
                }
                id = decoded.id;
            });

            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "Пользователь не найден", status: 404 });
            }
            user.is_active = req.query.is_active || req.params.is_active || false;
            await user.save();

            return res.status(200).json({message: "Данные изменены", user, status: 200});
        } catch (error) {
            console.error("Ошибка на сервере", error);
            return CustomError.handleInternalServerError(res, "Ошибка на сервере", 500);
        }
    }

    async userRoleUpdate(req, res) {
        const { id } = req.params || req.body;
        const {role_id} = req.body;
        if(!role_id) {
            return CustomError.handleNotFound(res, "Данных нет", 400);
        }

        const user = await User.findByPk(id);
        if(!user) {
            return res.status(404).json({ message: "Пользователь не найден", status: 404 });
        }

        user.role_id = role_id || user.role_id;
        await user.save();

        return res.status(200).json({ message: "Роль изменена", status: 200, user});
    }
}

module.exports = new AuthController();