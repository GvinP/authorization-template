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
const userService_1 = __importDefault(require("../services/userService"));
const express_validator_1 = require("express-validator");
const apiError_1 = __importDefault(require("../exeptions/apiError"));
class AuthController {
    registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return next(apiError_1.default.BadRequest('Validation error', errors.array()));
                }
                const { email, password } = req.body;
                const userData = yield userService_1.default.registration(email, password);
                res.cookie('refreshToken', userData.refreshToken, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true });
                return res.json(userData);
            }
            catch (error) {
                next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const userData = yield userService_1.default.login(email, password);
                res.cookie('refreshToken', userData.refreshToken, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true });
                return res.json(userData);
            }
            catch (error) {
                next(error);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const token = yield userService_1.default.logout(refreshToken);
                res.clearCookie('refreshToken');
                return res.json(token);
            }
            catch (error) {
                next(error);
            }
        });
    }
    activate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activationLink = req.params.link;
                yield userService_1.default.activate(activationLink);
                return res.redirect(process.env.CLIENT_URL);
            }
            catch (error) {
                next(error);
            }
        });
    }
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const userData = yield userService_1.default.refresh(refreshToken);
                res.cookie('refreshToken', userData.refreshToken, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true });
                return res.json(userData);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService_1.default.getAllUsers();
                res.json(users);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new AuthController();
