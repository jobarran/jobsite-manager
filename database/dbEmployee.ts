import { Employee } from "@/models";
import { db } from "."
import { IEmployee } from "@/interfaces";


export const getEmployeeById = async (idNumber: string): Promise<IEmployee | null>  => {

    await db.connect()
    const employee = await Employee.findOne({ idNumber }).lean()
    await db.disconnect()

    if ( !employee ) {
        return null;
    }

    return JSON.parse(JSON.stringify( employee ))

}