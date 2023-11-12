import { IUser } from '@/interfaces';
import mongoose, { Schema, model, Model } from 'mongoose'


const userSchema = new Schema({
    idCompany : { type: String, required: true },
    name      : { type: String, required: true },
    lastName  : { type: String, required: true },
    idUser    : { type: String, required: true, unique: true },
    email     : { type: String, required: true, unique: true },
    password  : { type: String, required: true },
    project   :     [{ type: String }],
    possition : { type: String, required: true },

    role: {
        type: String,
        enum: {
            values  : ['admin', 'user'],
            message : '{VALUE} is not a valid role',
            default : 'client',
            required: true
        }
    },
}, {
    timestamps: true
})

const User:Model<IUser> = mongoose.models.User || model('User', userSchema);

export default User;