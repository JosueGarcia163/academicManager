/*Aqui creamos una funcion que nos permita verificar el rol que esta haciendo la solicitud
esto se aplicara para el caso de editar y eliminar cursos.
De esta forma validamos de que los estudiantes no puedan acceder a la ruta
de editar ni eliminar.*/ 
const authorizeRole = (role) => (req, res, next) => {
    //Aqui verificamos que el role que tenga el usuario sea igual al role de TEACHER_ROLE.
    if (req.user.role !== role) {
        return res.status(403).json({ message: "No tienes permisos para realizar esta acción" });
    }
    next();
};

export default authorizeRole;
