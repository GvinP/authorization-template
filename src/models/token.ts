import {Schema, model, Document, Types} from 'mongoose'

export interface IToken {
    refreshToken: string;
    user: Types.ObjectId;
}

const TokenSchema = new Schema<IToken>({
    refreshToken: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
})

export default model<IToken>("Token", TokenSchema);