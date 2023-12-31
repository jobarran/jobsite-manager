import { IEmployee } from '@/interfaces';
import mongoose, { Schema, model, Model } from 'mongoose'


const employeelSchema = new Schema({
    idCompany  : { type: String, required: true },
    name       : { type: String, required: true },
    lastName   : { type: String, required: true },
    idNumber   : { type: String, required: true, unique: true },
    status     : { type: String, required: true },
    project    : { type: String, required: true },
    phone      : { type: String, required: false },
    address    : { type: String, required: false},
    birth      : { type: String, required: false},
    entry      : { type: String, required: true },
    field      : { type: String, required: false },
    role       : { type: String, required: false},
    description: { type: String, required: false },

}, {
    timestamps: true
})

const Employee:Model<IEmployee> = mongoose.models.Employee || model('Employee', employeelSchema);

export default Employee;