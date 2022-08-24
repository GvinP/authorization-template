import User, { IUser } from "../models/user";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import mailService from "./mailService";
import tokenService from "./tokenService";
import UserDto from "../dtos/userDto";
import ApiError from "../exeptions/apiError";

class UserService {
  async registration(email: string, password: string) {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      throw ApiError.BadRequest(`User with email: ${email} alredy exist`);
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
      throw ApiError.BadRequest("Activation link isn't correct");
    }
    user.isActiveted = true;
    await user.save();
  }
  async login(email: string, password: string) {
    const user = await User.findOne({email})
    if(!user) {
      throw ApiError.BadRequest("Email or password you entered is incorrect")
    }
    const isPassEquals = await bcrypt.compare(password, user.password)
    if(!isPassEquals) {
      throw ApiError.BadRequest("Email or password you entered is incorrect")
    }
    const userDto = new UserDto(user);
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  async logout(refreshToken: string) {
    const token = tokenService.removeToken(refreshToken)
    return token
  }
  
  async refresh(refreshToken: string) {
    if(!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDB = await tokenService.findToken(refreshToken)
    if(!userData||!tokenFromDB) {
      throw ApiError.UnauthorizedError()
    }
    const user = await User.findById(tokenFromDB.user)
    const userDto = new UserDto(user!);
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  async getAllUsers() {
    const users = await User.find()
    return users
  }
}

export default new UserService();
