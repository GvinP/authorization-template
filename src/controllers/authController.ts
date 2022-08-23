import {Request, Response, NextFunction} from "express";
import userService from "../services/userService";

class AuthController {
    async registration (req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body
            const userData = await userService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 15*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        } catch (error) {
            console.log(error);
        }
    }

    async login (req: Request, res: Response, next: NextFunction) {
        try {
            
        } catch (error) {
            
        }
    }

    async logout (req: Request, res: Response, next: NextFunction) {
        try {
            
        } catch (error) {
            
        }
    }

    async activate (req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL!)      
        } catch (error) {
            
        }
    }

    async refresh (req: Request, res: Response, next: NextFunction) {
        try {
            
        } catch (error) {
            
        }
    }

    async getUsers (req: Request, res: Response, next: NextFunction) {
        try {
            res.json(['123','456'])
        } catch (error) {
            
        }
    }
}

export default new AuthController();
