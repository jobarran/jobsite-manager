
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '../../../database';
import { User } from '../../../models';
import { validations } from '../../../utils';
import { signIn } from 'next-auth/react';
import { IClient } from '@/interfaces';
import Client from '@/models/Client';

type Data = 
| { message: string }
| {
    client: IClient
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'POST':
            return registerClient(req, res)

        default:
            res.status(400).json({
                message: 'Bad request'
            })
    }
}

const registerClient = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
        
    const {
        idCompany  = '', 
        name       = '', 
        lastName   = '', 
        email      = '', 
        companyName= '', 
        phone      = '', 
        address    = '', 
        description= '', 
    } = req.body as {
            idCompany:string, 
            name:string,
            lastName:string, 
            email:string,
            companyName:string,
            phone:string,
            address:string,
            description:string,
        };

    
    await db.connect();
    const client = await Client.findOne({ email });

    if ( client ) {
        return res.status(400).json({
            message:'Oops! We already have a client registered with this emai'
        })
    }

    const newClient = new Client({
        email: email.toLocaleLowerCase(),
        idCompany, 
        name,
        lastName, 
        companyName,
        phone,
        address,
        description,
    });

    try {
        await newClient.save({ validateBeforeSave: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Check server logs'
        })
    }


    return res.status(200).json({
        client: {
            _id: newClient._id.toString(),
            email, 
            idCompany, 
            name,
            lastName, 
            companyName,
            phone,
            address,
            description,
        }
    })

}
