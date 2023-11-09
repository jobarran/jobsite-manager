import { Project } from "@/models"
import { db } from "."
import { IProject } from "@/interfaces";


export const getProjectById = async ( idProject: string): Promise<IProject | null>  => {

    await db.connect()
    const project = await Project.findOne({ idProject }).lean()
    await db.disconnect()

    if ( !project ) {
        console.log('No project found')
        return null;
    }

    return JSON.parse(JSON.stringify( project ))

}


export const getAllProjects =async (): Promise<IProject[]> => {

    await db.connect();
    const projects = await Project.find({})
    .select('name idProject status -_id')
    .lean()

    await db.disconnect();

    return projects
    
}