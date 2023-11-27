import { IEmployee } from '@/interfaces';
import mongoose, { Schema, model, Model } from 'mongoose'


const clientlSchema = new Schema({
    idCompany  : { type: String, required: true },
    name       : { type: String, required: true },
    lastName   : { type: String, required: true },
    email      : { type: String, required: true, unique: true },
    companyName: { type: String, required: false },
    phone      : { type: String, required: false },
    address    : { type: String, required: false },
    description: { type: String, required: false },

}, {
    timestamps: true
})

const Client:Model<IEmployee> = mongoose.models.Client || model('Client', clientlSchema);

export default Client;