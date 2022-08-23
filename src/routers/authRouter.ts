import express from "express";
import authController from "../controllers/authController";

const authRouter = express.Router()


authRouter.post('/registration', authController.registration)
authRouter.post('/login', authController.login)
authRouter.post('/logout', authController.logout)
authRouter.get('/activate/:link', authController.activate)
authRouter.get('/refresh', authController.refresh)
authRouter.get('/users', authController.getUsers)

export default authRouter;