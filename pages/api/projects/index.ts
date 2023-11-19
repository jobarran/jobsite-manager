// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Project } from '@/models';
import { IProject,  } from '@/interfaces';
import { db, seeeDatabase } from '@/database';


type Data = 
  | {message: string}
  | IProject[]


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    switch ( req.method ) {
        case 'GET':
            return getProjects( req, res )
    
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
    
}


const getProjects = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    await db.connect();

    const projects = await Project.find()
                            .select('name idProject status')
                            .lean();

    // await db.disconnect();

    return res.status(200).json( projects );

}

