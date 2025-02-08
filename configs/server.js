'use strict'

//Express es un framework para manejar rutas y servidores http
import express from 'express'
//cors un middleware para permitir o restringir solicitudes de otros dominios.
import cors from 'cors'
//middleware de seguridad para proteger la API.
import helmet from 'helmet'
//Middlevare para mostrar la solicitud http en consola, informacion como el estado, tiempo de respuesta, etc.
import morgan from 'morgan'
import { dbConnect } from './mongo.js'
//Nos ayuda a manejar la autenticacion de usuarios.
import authRoutes from "../src/auth/auth.routes.js"
//middleware para limitar la cantidad de peticiones.
import apiLimiter from '../src/middlewares/validar-cant-peticiones.js'
//con user,routes manejamos las operaciones con los usuarios
import userRoutes from "../src/user/user.routes.js"
//importamos la ruta para asignar los cursos
import curseRoutes from "../src/course/course.routes.js"


//Express realiza la solicitud a la base de datos.

// Configuraciones basicas del servidor
const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())// para que pueda responer
    app.use(helmet())//para cierto tipos de ataques.
    app.use(morgan('dev'))
    app.use(apiLimiter)
}

const routes = (app) =>{
    app.use("/academicManager/v1/auth", authRoutes)
    app.use("/academicManager/v1/user",userRoutes)
    app.use("/academicManager/v1/course",curseRoutes)
}

const conectarDB = async () => {
    try {
        await dbConnect()

    } catch (err) {
        console.log(`Database connection failed: ${err}`)
    }
}

//Para utilizar el metodo anterior en todo el programa o servidor
export const initServer = () => {
    const app = express()
    try {
        //le paso express que es lo que se almaceno en app.
        middlewares(app)
        conectarDB()
        routes(app)
        //Para que el servidor escuche el puerto.
        app.listen(process.env.PORT)
        //Que imprima el proceso del puerto.
        console.log(`Server running on port ${process.env.PORT}`)

    } catch (err) {
        console.log(`Server init failed ${err}`)

    }
}