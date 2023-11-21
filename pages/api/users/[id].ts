// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database';
import { User } from '@/models';
import { IUser } from '@/interfaces';

type Data = 
  | {message: string}
  | IUser


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    switch ( req.method ) {
        case 'GET':
            return getUserById( req, res )
    
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
    
}


const getUserById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {    

    await db.connect();
    const { id } = req.query
    const user = await User.findOne({ id }).lean()

    if( !user ) {
        return res.status(404).json({
            message: 'User not found'
        })
    }
    
    res.status(200).json( user )
}

