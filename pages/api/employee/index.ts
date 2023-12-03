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
        case 'PUT':
            return editEmployee( req, res )
        case 'DELETE':
            return deleteEmployee( req, res )
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
    
}


const getEmployee = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    try {

        await db.connect();
        const employee = await Employee.find({})
                                       .select('name lastName idNumber status role field project phone adress birth category entry tags description')
                                       .lean();
    
        return res.status(200).json( employee );
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Verify servidor logs' });
    }

}

const editEmployee = async(req: NextApiRequest, res: NextApiResponse) => {

    try {
        await db.connect();
        const employee = await Employee.findOne({idNumber: req.body.idNumber});
        if ( !employee ) {
            return res.status(400).json({message: 'There is no employee with that ID'});
        }

        const updateEmployee = await Employee.findOneAndUpdate({idNumber: req.body.idNumber}, req.body, { new: true });
        res.status(200).json({ message: 'Employee Updated' });

        
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Check server logs' });
    }

}

const deleteEmployee = async(req: NextApiRequest, res: NextApiResponse) => {

    try {
        await db.connect();
        const employee = await Employee.findOne({idNumber: req.body.values.idNumber});
        if ( !employee ) {
            return res.status(400).json({message: 'There is no employee with that ID'});
        }

        await Employee.findOneAndDelete({idNumber: req.body.values.idNumber});
        res.status(200).json({ message: 'Employee deleted' });

        
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Check server logs' });
    }

}