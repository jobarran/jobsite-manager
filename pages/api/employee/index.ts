import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database';
import { IEmployee } from '@/interfaces';
import Employee from '@/models/Employee';


type Data = 
  | {message: string}
  | IEmployee[]


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    switch ( req.method ) {
        case 'GET':
            return getEmployee( req, res )
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
    
}


const getEmployee = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    try {

        await db.connect();
        const employee = await Employee.find()
                                       .select('name lastName idNumber state project phone adress birth category entry tags description')
                                       .lean();
    
        await db.disconnect();
        return res.status(200).json( employee );
        
    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Verify servidor logs' });
    }

}