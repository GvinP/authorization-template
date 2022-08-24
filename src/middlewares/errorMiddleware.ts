import {Request, Response, NextFunction} from "express";
import ApiError from "../exeptions/apiError";

export default function (err: ApiError, req: Request, res: Response, next: NextFunction) {
    if(err instanceof ApiError) {
        res.status(err.status).json({message: err.message, errors: err.errors})
    }
    return res.status(500).json({message: 'Internal Server Error'})
}