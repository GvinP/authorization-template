import { Request, Response, NextFunction } from "express";
import ApiError from "../exeptions/apiError";
import tokenService from "../services/tokenService";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: string | JwtPayload;
  }

export default function (req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
}
