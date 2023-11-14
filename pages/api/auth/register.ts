import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '../../../database';
import { User } from '../../../models';
import { validations } from '../../../utils';
import { signIn } from 'next-auth/react';

type Data = 
| { message: string }
| {
    user: {
        email: string;
        name: string;
        role: string;
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'POST':
            return registerUser(req, res)

        default:
            res.status(400).json({
                message: 'Bad request'
            })
    }
}

const registerUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
        
    const {
        email = '',
        password = '',
        name = '',
        lastName = '',
        idUser = '',
        idCompany = '',
        possition = '',
        role = ''
    } = req.body as {
            email: string,
            password: string,
            name: string,
            lastName: string,
            idUser: string,
            idCompany: string,
            possition: string,
            role: string,
        };

    if ( password.length < 6 ) {
        return res.status(400).json({
            message: 'Password must have at least 6 characters'
        });
    }
    
    if ( !validations.isValidEmail( email ) ) {
        return res.status(400).json({
            message: 'Enter a valid email address'
        });
    }
    
    
    await db.connect();
    const user = await User.findOne({ email });

    if ( user ) {
        return res.status(400).json({
            message:'Another account is using the same email'
        })
    }

    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync( password ),
        name,
        lastName,
        idUser,
        idCompany,
        possition,
        role
    });

    try {
        await newUser.save({ validateBeforeSave: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Check server logs'
        })
    }


    return res.status(200).json({
        user: {
            email, 
            role, 
            name,
        }
    })

}
