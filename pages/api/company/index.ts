import { db } from "@/database"
import { ICompany } from "@/interfaces/company"
import { Company } from "@/models"
import { NextApiRequest, NextApiResponse } from "next"

type Data = 
  | {message: string}
  | ICompany[]


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    switch ( req.method ) {
        case 'POST':
            return createCompany( req, res )
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
    
}


const createCompany = async(req: NextApiRequest, res: NextApiResponse) => {

    try {
        await db.connect()
        const company = new Company( req.body );
        await company.save();
        await db.disconnect();
        res.status(201).json( company );


    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Check server logs' });
     }


}