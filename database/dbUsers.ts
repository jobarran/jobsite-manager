import { User } from "@/models"
import { db } from "."
import bcrypt from 'bcryptjs';
import { IUser } from "@/interfaces";


export const checkUserEmailPassword = async ( email: string, password: string ) => {

    await db.connect()
    const user = await User.findOne({ email })
    await db.disconnect()

    if ( !user ) {
        return null
    }

    if ( !bcrypt.compareSync( password, user.password! ) ) {
        return null
    }

    const { role, name, lastName, idUser, possition, project, _id} = user

    return {
        _id,
        email: email.toLocaleLowerCase(),
        role,
        name,
        lastName,
        idUser,
        project,
        possition
    }
}


// Crea o verifica usuario de oauth
// export const oAuthToDbUser = async ( oAuthEmail: string, oAuthName: string ) => {

//     await db.connect();
//     const user = await User.findOne({ email: oAuthEmail });

//     if ( user ) {
//         await db.disconnect();
//         const { _id, name, lastName, email, role } = user;
//         return { _id, name, lastName, email, role };
//     }

//     const newUser = new User({ email: oAuthEmail, name: oAuthName, password: '@', role: 'client'  });
//     await newUser.save();
//     await db.disconnect();

//     const { _id, name, email, role } = newUser;
//     return { _id, name, email, role };
    
// }


export const getUsersByLegajo = async (idUser: string): Promise<IUser | null>  => {

    await db.connect()
    const user = await User.findOne({ idUser }).lean()
    await db.disconnect()

    if ( !user ) {
        return null;
    }

    return JSON.parse(JSON.stringify( user ))

}

interface UserId {
    idUser: string;
}

export const getAllUserLegajo = async (): Promise<UserId[]> => {
    
    await db.connect();
    const slug = await User.find().select( 'idUser -_id' ).lean();
    await db.disconnect();

    return slug;

}
