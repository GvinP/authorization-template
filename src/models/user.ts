import {Schema, model, Document, Types} from 'mongoose'

export interface IUser {
    _id: Types.ObjectId;
    email: string;
    password: string;
    isActiveted: boolean;
    activationLink: string;
    createdAt: Date;
}

const UserSchema: Schema = new Schema<IUser>({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isActiveted: {type: Boolean, default: false},
    activationLink: {type: String},
    createdAt: Date,
})

export default model<IUser>("User", UserSchema);