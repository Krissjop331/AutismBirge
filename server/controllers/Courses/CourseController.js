const CustomError = require('../../Errors/errors');
const db = require('../../models/index');
const Role = db.Role;
const Courses = db.Courses;
const User = db.User;
const CoursesTestResult = db.CoursesTestResult;
const CoursesTest = db.CoursesTest;
const CoursesType = db.CoursesType;

const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require('../../config/config.json');
const secret = config.secretKey || 'JWTKEY';


class CoursesController {

    async getAllCourse(req, res) {
        try {
            const courses = await Courses.findAll();
            const coursesTestResult = await CoursesTestResult.findAll({include: [{model: Test}, {model: User}]})
            const coursesTest = await CoursesTest.findAll({include: [{model: Courses}, {model:  CoursesType}]});
            // if (!courses || courses.length === 0) {
            //     return CustomError.handleNotFound(res, "Курсов нет");
            // }

            // const coursesWithModules = await Promise.all(courses.map(async course => {
            //     const courseModules = await CoursesModule.findAll({
            //         where: { course_id: course.id }
            //     });

            //     return {
            //         ...course.toJSON(), // Преобразуем курс в обычный объект, если он является экземпляром модели Sequelize
            //         coursesModules: courseModules
            //     };
            // }));

            // return res.status(200).json({ courses: coursesWithModules });

        } catch (error) {
            console.log(error);
            return res.status(500).json({error: `Ошибка на стороне сервера: ${error}`})   
        }
    }
    
}

module.exports = new CoursesController();