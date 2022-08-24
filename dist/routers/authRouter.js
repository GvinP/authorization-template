"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const express_validator_1 = require("express-validator");
const authRouter = express_1.default.Router();
authRouter.post('/registration', (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isLength({ min: 8, max: 32 }), authController_1.default.registration);
authRouter.post('/login', authController_1.default.login);
authRouter.post('/logout', authController_1.default.logout);
authRouter.get('/activate/:link', authController_1.default.activate);
authRouter.get('/refresh', authController_1.default.refresh);
authRouter.get('/users', authMiddleware_1.default, authController_1.default.getUsers);
exports.default = authRouter;
