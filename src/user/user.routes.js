import {Router} from "express";
import { getUserByIdValidator, deleteUserValidator, updatePasswordValidator } from "../middlewares/check-validator.js";
import { getUserById, getUsers, deleteUser , updatePassword} from "./user.controller.js";
const router = Router()

export default router