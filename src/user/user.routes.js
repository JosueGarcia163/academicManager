import { Router } from "express";
import { getUserByIdValidator, deleteUserValidator, updatePasswordValidator, updateUserValidator } from "../middlewares/check-validator.js";
import { getUserById, getUsers, deleteUser, updatePassword, updateUser } from "./user.controller.js";
import { isEstudent, authenticateJWT } from "../middlewares/validar-rol.js";
const router = Router()

router.get("/findUser/:uid", getUserByIdValidator, getUserById)

router.get("/", getUsers)

router.delete("/deleteUser/:uid", deleteUserValidator, authenticateJWT, deleteUser)

router.patch("/updatePassword/:uid", updatePasswordValidator, authenticateJWT, updatePassword)

router.put("/updateUser/:uid", updateUserValidator, authenticateJWT, updateUser)

export default router