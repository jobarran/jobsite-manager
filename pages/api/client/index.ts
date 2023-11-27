import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database';
import { IEmployee } from '@/interfaces';
import Employee from '@/models/Employee';
import Client from '@/models/Client';


type Data = 
  | {message: string}
  | IEmployee[]


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    switch ( req.method ) {
        case 'GET':
            return getClients( req, res )
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
    
}


const getClients = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    try {

        await db.connect();
        const clients = await Client.find({})
                                       .select('idCompany name lastName email companyName phone adress description')
                                       .lean();
    
        return res.status(200).json( clients );
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Verify servidor logs' });
    }

}