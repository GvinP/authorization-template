"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
authRouter.post('/registration');
authRouter.post('/login');
authRouter.post('/logout');
authRouter.get('/activate/:link');
authRouter.get('/refresh');
authRouter.get('/users');
exports.default = authRouter;
