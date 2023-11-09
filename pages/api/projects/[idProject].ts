// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Project } from '@/models';
import { IProject,  } from '@/interfaces';
import { db, seeeDatabase } from '@/database';

type Data = 
  | {message: string}
  | IProject

  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
  
      switch ( req.method ) {
          case 'GET':
              return getProjectById( req, res )
      
          default:
              return res.status(400).json({
                  message: 'Bad request'
              })
      }
      
  }


const getProjectById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {    

    await db.connect();
    const { idProject } = req.query
    const project = await Project.findOne({ idProject }).lean()
    await db.disconnect();

    if( !project ) {
        return res.status(404).json({
            message: 'Project not found'
        })
    }
    
    res.status(200).json( project )
}
