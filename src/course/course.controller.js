import Course from './course.model.js';
import User from '../user/user.model.js';

// Crear un curso (solo lo puede hacer un profesor)
export const createCourse = async (req, res) => {
    try {
        const { name } = req.body;
        const teacherId = req.user.id;  // Usamos el ID del profesor desde el token JWT

        // Buscamos un usuario por Id que sea el profesor.
        const user = await User.findById(teacherId);

        //Validacion por si no encontramos el usuario.
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // validacion para confirmar que el rol del usuario para crear cursos sea unicamente el teacher.
        if (user.role !== 'TEACHER_ROLE') {
            return res.status(403).json({ message: 'No tienes permiso para crear cursos' });
        }

        // Aqui creamos el nuevo curso tomando como parametros el nombre y el profesor que hizo el curso.
        const newCourse = new Course({ name, teacher: teacherId });
        await newCourse.save();

        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el curso', error });
    }
};

// Inscribir un estudiante a un curso
export const enrollInCourse = async (req, res) => {
    try {
        /*se extrae el id que el usuario puso en el body y se almacena en courseId
        osea en otras palabras cuando el usuario se asigne a un curso debera de colocar el id de este.*/
        const { courseId } = req.body;
        const studentId = req.user.id;  // Usamos el ID del estudiante desde el token JWT

        //Buscamos la informacion del curso que coloco el usuario en el body
        const course = await Course.findById(courseId);


        // Verificar si el curso es encontrado.
        if (!course) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }

        // Verificar que el estudiante no esté ya inscrito en este curso
        if (course.students.includes(studentId)) {
            return res.status(400).json({ message: 'Ya estás inscrito en este curso' });
        }

        // Verificar que el estudiante no tenga más de 3 cursos asignados
        const student = await User.findById(studentId);


        //Validamos si el usuario existe.
        if (!student) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }


        //Hacemos la validacion para que el estudiante no se pueda asignar a mas de 3 cursos.
        if (student.courses.length >= 3) {
            return res.status(400).json({ message: 'No puedes estar inscrito en más de 3 cursos' });
        }


        /*Se guarda en el curso al estudiante que se asigno*/
        course.students.push(studentId);
        //Se guarda en el estudiante el curso.
        student.courses.push(courseId);

        await course.save();
        await student.save();

        res.status(200).json({
            message: 'Inscripción exitosa'
        });
    } catch (err) {
        console.error("Error al inscribir al curso:", err);
        return res.status(500).json({
            message: "Error al inscribirse en el curso",
            error: err.message || err
        });
    }
};

//Funcion de listar.
export const listCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("students", "name surname");
        res.status(200).json({ courses });
    } catch (err) {
        console.error("Error al listar cursos:", err);
        res.status(500).json({ message: "Error al obtener los cursos", error: err.message });
    }
};

//Funcion de actualizar.
export const updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { name } = req.body;

        // Verificar si el curso existe
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Curso no encontrado" });
        }

        // Actualizamos todos los datos del curso a los nuevos datos que estan en el body.
        course.name = name || course.name;
       // course.description = description || course.description;
        //Guardamos los cambios.
        await course.save();

        //Enviamos un ok.
        res.status(200).json({ message: "Curso actualizado exitosamente", course });
    } catch (err) {
        console.error("Error al actualizar el curso:", err);
        res.status(500).json({ message: "Error al actualizar el curso", error: err.message });
    }
};

//Funcion de actualizar.
export const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        // Verificar si el curso existe
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Curso no encontrado" });
        }

        //Aqui eliminamos el curso por id de curso.
        await course.findByIdAndDelete(courseId);

        //Enviamos un ok.
        res.status(200).json({ message: "Curso eliminado exitosamente", course });
    } catch (err) {
        console.error("Error al eliminar el curso:", err);
        res.status(500).json({ message: "Error al eliminar el curso", error: err.message });
    }
};

