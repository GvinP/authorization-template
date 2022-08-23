import {Schema, model, Document, Types} from 'mongoose'

export interface IUser {
    email: string;
    password: string;
    isActiveted: boolean;
    activationLink: string;
}

const UserSchema = new Schema<IUser>({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isActiveted: {type: Boolean, default: false},
    activationLink: {type: String},

})

export default model<IUser>("User", UserSchema);