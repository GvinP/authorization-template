"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = __importDefault(require("../exeptions/apiError"));
function default_1(err, req, res, next) {
    if (err instanceof apiError_1.default) {
        res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
}
exports.default = default_1;
