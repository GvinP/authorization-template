import { IUser } from "../models/user";
import { Types } from "mongoose";

class UserDto {
  email: string;
  id: Types.ObjectId;
  isActivated: boolean;
  constructor(model: IUser) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActiveted;
  }
}

export default UserDto;
