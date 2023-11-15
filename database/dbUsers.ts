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

    const { role, name, lastName, possition, project, idCompany, _id} = user

    return {
        _id,
        email: email.toLocaleLowerCase(),
        role,
        name,
        lastName,
        project,
        possition,
        idCompany
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


export const getUsersById = async (id: string): Promise<IUser | null>  => {

    console.log(id)
    await db.connect()
    const user = await User.findOne({ _id:id }).lean()
    await db.disconnect()

    if ( !user ) {
        return null;
    }

    return JSON.parse(JSON.stringify( user ))

}
