"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_1 = __importDefault(require("../models/token"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ACCESS_SECRET_KEY = process.env.JWT_ACCESS_KEY;
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_KEY;
class TokenService {
    generateTokens(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = jsonwebtoken_1.default.sign(payload, ACCESS_SECRET_KEY, {
                expiresIn: "30m",
            });
            const refreshToken = jsonwebtoken_1.default.sign(payload, REFRESH_SECRET_KEY, {
                expiresIn: "15d",
            });
            return { accessToken, refreshToken };
        });
    }
    saveToken(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield token_1.default.findOne({ user: userId });
            if (tokenData) {
                tokenData.refreshToken = refreshToken;
                return yield tokenData.save();
            }
            const token = yield token_1.default.create({ user: userId, refreshToken });
            return token;
        });
    }
    removeToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield token_1.default.findOneAndDelete({ refreshToken });
            return token;
        });
    }
    validateAccessToken(token) {
        try {
            const userData = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_KEY);
            return userData;
        }
        catch (error) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_KEY);
            return userData;
        }
        catch (error) {
            return null;
        }
    }
    findToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield token_1.default.findOne({ refreshToken });
            return token;
        });
    }
}
exports.default = new TokenService();
