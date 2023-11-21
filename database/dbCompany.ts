import { Company } from "@/models"
import { db } from "."
import { ICompany } from "@/interfaces/company";


export const getCompanyById = async ( idCompany: string): Promise<ICompany | null>  => {

    await db.connect()
    const company = await Company.findOne({ idCompany }).lean()

    if ( !company ) {
        console.log('No company found')
        return null;
    }

    return JSON.parse(JSON.stringify( company ))

}