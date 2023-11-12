import { IUser } from '@/interfaces';
import { ICompany } from '@/interfaces/company';
import mongoose, { Schema, model, Model } from 'mongoose'

const companySubSchema = new Schema ({
    employeeFields: [{type: String, required: false}],
    employeeRoles : [{type: String, required: false}],
    userPossitions: [{type: String, required: false}],
})

const companySchema = new Schema({
    idCompany : { type: String, required: true },
    name      : { type: String, required: true },
    createdBy : { type: String, required: true },
    settings  : companySubSchema,
}, {
    timestamps: true
})

const Company: Model<ICompany> = mongoose.models.Company || model('Company', companySchema);

export default Company;