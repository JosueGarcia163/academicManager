import {Router} from "express";
import { createCourse, enrollInCourse, listCourses, updateCourse } from './course.controller.js';
import { authenticateJWT, isTeacher } from '../middlewares/validar-rol.js';
import authorizeRole from "../middlewares/role-validator.js";

const router = Router()

// Ruta para crear un curso (solo para profesores)
router.post('/create', authenticateJWT, isTeacher, createCourse);

// Ruta para inscribirse a un curso (solo para estudiantes)
router.post('/enroll', authenticateJWT, enrollInCourse);

// Ruta para poder listar siendo alumno o estudiante
router.get('/', authenticateJWT, listCourses);

//Colocamos ruta para poder editar.
router.put('/update/:courseId', authenticateJWT, authorizeRole("TEACHER_ROLE"), updateCourse)

export default router;
