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
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const mailService_1 = __importDefault(require("./mailService"));
const tokenService_1 = __importDefault(require("./tokenService"));
const userDto_1 = __importDefault(require("../dtos/userDto"));
class UserService {
    registration(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldUser = yield user_1.default.findOne({ email });
            if (oldUser) {
                throw new Error(`User with email: ${email} alredy exist`);
            }
            const hashPassword = yield bcrypt_1.default.hash(password, 10);
            const activationLink = (0, uuid_1.v4)();
            const user = yield user_1.default.create({
                email,
                password: hashPassword,
                activationLink,
                createdAt: new Date(),
            });
            yield mailService_1.default.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
            const userDto = new userDto_1.default(user);
            const tokens = yield tokenService_1.default.generateTokens(Object.assign({}, userDto));
            yield tokenService_1.default.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    activate(activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findOne({ activationLink });
            if (!user) {
                throw new Error("Activation link isn't correct");
            }
            user.isActiveted = true;
            yield user.save();
        });
    }
}
exports.default = new UserService();
