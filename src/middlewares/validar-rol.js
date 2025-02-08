import jwt from 'jsonwebtoken';
import User from '../user/user.model.js';


export const authenticateJWT = (req, res, next) => {
    /*Intentamos obtener el valor de Authorization en la cabecera http 
    donde el usuario recibe el token.
    con .replace nos aseguramos de parsear o cambiar el formato si viene en formato
    Bearer <token> entonces asi lo limpiamos y el ? es para que responda Undefined
    si no viene nada.*/
    const token = req.header('Authorization')?.replace('Bearer ', '');
    //Si no encontramos el token rechazamos la solicitud .
    if (!token) return res.status(403).json({ message: 'No autorizado debes de colocar el token en el header' });

    /*Aqui verificamos que el token sea valido,
    luego miramos si la clave JWT_SECRET es la misma que la que se utilizo cuando se genero el token. */
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token no válido' });

        //Almacenamos la informacion del usuario en el request para garantizar que si se puedan acceder a los datos del usuario.
        req.user = { id: decoded.uid};
        next();
    });
};

// Middleware para verificar si el usuario es un profesor
export const isTeacher = async (req, res, next) => {
    if (!req.user || !req.user.id) {
        return res.status(403).json({ message: 'Usuario no autorizado, falta id en el token' });
    }
    //Buscamos al usuario mediante una promesa despues de verificarlo con jwt previamente.
    const user = await User.findById(req.user.id);
    //Miramos si el usuario es un alumno le mandamos un mensaje que no tiene permisos.
    if (user.role !== 'TEACHER_ROLE') {
        return res.status(403).json({ message: 'No tienes permisos para realizar esta acción' });
    }
    next();
};

// Creamos un middleware que nos permita verificar que es un alumno
export const isEstudent = async (req, res, next) => {
    if (!req.user || !req.user.id) {
        return res.status(403).json({ message: 'Usuario no autorizado, falta id en el token' });
    }
    //Buscamos al usuario mediante una promesa despues de verificarlo con jwt previamente.
    const user = await User.findById(req.user.id);
    //Miramos si el usuario es un alumno le mandamos un mensaje que no tiene permisos.
    if (user.role !== 'STUDENT_ROLE') {
        return res.status(403).json({ message: 'Solo puedes realizar esta accion siendo estudiante.' });
    }
    next();
};
