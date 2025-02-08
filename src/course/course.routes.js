import {Router} from "express";
import { createCourse, enrollInCourse, listCourses, updateCourse, deleteCourse } from './course.controller.js';
import { authenticateJWT, isTeacher, isEstudent } from '../middlewares/validar-rol.js';

const router = Router()

// Ruta para crear un curso (solo para profesores)
router.post('/create', authenticateJWT, isTeacher, createCourse);

// Ruta para inscribirse a un curso (solo para estudiantes)
router.post('/enroll', authenticateJWT, isEstudent, enrollInCourse);

// Ruta para poder listar siendo alumno o estudiante
router.get('/', authenticateJWT, listCourses);

//Colocamos ruta para poder editar curso.
router.put('/update/:courseId', authenticateJWT, isTeacher, updateCourse)

//Colocamos ruta para poder eliminar curso.
router.delete('/delete/:courseId', authenticateJWT, isTeacher, deleteCourse)

export default router;
