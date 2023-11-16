// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seeeDatabase } from '@/database';
import { Company, User } from '@/models';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import Project from '@/models/Project';
import Employee from '@/models/Employee';

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const session = await getServerSession(req, res, authOptions as any)

  // if (session) {
  //   console.log("Session", JSON.stringify(session, null, 2))
    
  //   if( process.env.NODE_ENV === 'production' ){
  //       return res.status(401).json({ message: 'No tiene acceso a este API'})

  //   }
    
    await db.connect();
  
    await User.deleteMany();
    await User.insertMany( seeeDatabase.initialData.users )

    await Company.deleteMany();
    await Company.insertMany( seeeDatabase.initialData.company ); 
  
    await Project.deleteMany();
    await Project.insertMany( seeeDatabase.initialData.projects ); 

    await Employee.deleteMany();
    await Employee.insertMany( seeeDatabase.initialData.employees ); 
  
    await db.connect();
    
  
    res.status(200).json({ message: 'Proceso realizado correctamente' })
  

  // } else {
  //   console.log('Not signed in')
  //   res.status(401)
  // }

  res.end()


}

