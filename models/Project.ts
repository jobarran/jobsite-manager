import { IProject } from '@/interfaces';
import mongoose, { Schema, model, Model } from 'mongoose'


const userSchema = new Schema({
    idCompany : { type: String, required: true },
    name    : { type: String, required: true },
    idProject  : { type: String, required: true, unique: true },
    status     : {
        type: String,
        enum: {
            values  : ['ongoing', 'finished', 'upcoming', ''],
            message : '{VALUE} is not a valid state',
            required: true
        }
    },
})

const Project:Model<IProject> = mongoose.models.Project || model('Project', userSchema);

export default Project;