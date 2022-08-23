"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActiveted: { type: Boolean, default: false },
    activationLink: { type: String },
    createdAt: Date,
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
