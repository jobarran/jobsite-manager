import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@/models';
import { IUser,  } from '@/interfaces';
import { db } from '@/database';


type Data = 
  | {message: string}
  | IUser[]


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    switch ( req.method ) {
        case 'GET':
            return getUser( req, res )
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
    
}


const getUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    try {

        await db.connect();
        const user = await User.find()
                                       .select('name lastName idUser email possition project role idCompany')
                                       .lean();
    
        await db.disconnect();
        return res.status(200).json( user );
        
    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Verify servidor logs' });
    }


}