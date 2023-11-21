// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Company } from '@/models';
import { db } from '@/database';
import { ICompany } from '@/interfaces/company';
import { closeDatabaseConnection } from '@/database/db';

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

    const con = await db.connect();
    console.log({connectino:con})
    const { idCompany } = req.query
    const company = await Company.findOne({ idCompany }).lean()

    if( !company ) {
        return res.status(404).json({
            message: 'Company not found'
        })
    }

    await closeDatabaseConnection();
    
    res.status(200).json( company )
}
