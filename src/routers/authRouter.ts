import express from "express";
import authController from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";
import { body } from 'express-validator'
const authRouter = express.Router()



authRouter.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 8, max: 32}),
     authController.registration)
authRouter.post('/login', authController.login)
authRouter.post('/logout', authController.logout)
authRouter.get('/activate/:link', authController.activate)
authRouter.get('/refresh', authController.refresh)
authRouter.get('/users', authMiddleware, authController.getUsers)

export default authRouter;