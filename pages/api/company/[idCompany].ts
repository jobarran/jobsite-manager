// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Company } from '@/models';
import { db } from '@/database';
import { ICompany } from '@/interfaces/company';

type Data = 
  | {message: string}
  | ICompany

  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
  
      switch ( req.method ) {
          case 'GET':
              return getCompanyById( req, res )
      
          default:
              return res.status(400).json({
                  message: 'Bad request'
              })
      }
      
  }


const getCompanyById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {    

    await db.connect();
    const { idCompany } = req.query
    const company = await Company.findOne({ idCompany }).lean()
    // await db.disconnect();

    if( !company ) {
        return res.status(404).json({
            message: 'Company not found'
        })
    }
    
    res.status(200).json( company )
}
