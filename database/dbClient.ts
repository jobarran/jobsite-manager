import { db } from "."
import { IClient } from "@/interfaces";
import Client from "@/models/Client";


export const getClientById = async (id: string): Promise<IClient | null>  => {

    await db.connect()
    const client = await Client.findOne({ _id:id })

    if ( !client ) {
        return null;
    }

    return JSON.parse(JSON.stringify( client ))

}