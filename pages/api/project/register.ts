
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../database';
import { IProject } from '@/interfaces';
import Client from '@/models/Client';
import { Project } from '@/models';

type Data = 
| { message: string }
| {
    project: IProject
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'POST':
            return registerProject(req, res)

        default:
            res.status(400).json({
                message: 'Bad request'
            })
    }
}

const registerProject = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
        
    const {
        idCompany   = '',
        name        = '',
        idProject   = '',
        idClient    = '',
        description = '',
        status      = '',
    } = req.body as {
            idCompany  : string;
            name       : string;
            idProject  : string;
            idClient   : string;
            description: string;
            status     : string;
        };

    
    await db.connect();
    const project = await Project.findOne({ idProject });

    if ( project ) {
        return res.status(400).json({
            message:'Oops! We already have a project registered with this ID'
        })
    }

    const newProject = new Project({
        idCompany  ,
        name       ,
        idProject  ,
        idClient   ,
        description,
        status     ,
    });

    try {
        await newProject.save({ validateBeforeSave: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Check server logs'
        })
    }


    return res.status(200).json({
        project: {
            _id: newProject._id,
            idCompany  ,
            name       ,
            idProject  ,
            idClient   ,
            description,
            status     ,
        }
    })

}
