import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import Token from "../models/token";
import { Types } from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const ACCESS_SECRET_KEY: Secret = process.env.JWT_ACCESS_KEY!;
const REFRESH_SECRET_KEY: Secret = process.env.JWT_REFRESH_KEY!;

type TPayload = {
    email: string
    id: Types.ObjectId
    isActivated: boolean
}

class TokenService {
  async generateTokens(payload: TPayload) {
    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: "15d",
    });
    return { accessToken, refreshToken };
  }

  async saveToken(userId: Types.ObjectId, refreshToken: string) {
    const tokenData = await Token.findOne({user: userId})
    if(tokenData) {
        tokenData.refreshToken = refreshToken
        return await tokenData.save()
    }
    const token = await Token.create({user: userId, refreshToken})
    return token
  }

  async removeToken(refreshToken: string) {
    const token = await Token.findOneAndDelete({refreshToken})
    return token
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_KEY!)
      return userData
    } catch (error) {
      return null
    }
  }
  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_KEY!)
      return userData
    } catch (error) {
      return null
    }
  }
  async findToken(refreshToken: string) {
    const token = await Token.findOne({refreshToken})
    return token
  }
}

export default new TokenService();
