import User, { IUser } from "../models/user";
import bcrypt from "bcrypt";
import uuid, { v4 } from "uuid";
import mailService from "./mailService";
import tokenService from "./tokenService";
import UserDto from "../dtos/userDto";
import { Document, Types } from "mongoose";

class UserService {
  async registration(email: string, password: string) {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      throw new Error(`User with email: ${email} alredy exist`);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const activationLink = v4();
    const user = await User.create({
      email,
      password: hashPassword,
      activationLink,
      createdAt: new Date(),
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );
    const userDto = new UserDto(user);
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  async activate(activationLink: string) {
    const user = await User.findOne({ activationLink });
    if (!user) {
      throw new Error("Activation link isn't correct");
    }
    user.isActiveted = true;
    await user.save();
  }
}

export default new UserService();
