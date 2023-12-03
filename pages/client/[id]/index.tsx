import { ProjectLayout } from "@/components/layouts";
import { dbClient } from "@/database";
import { IClient } from "@/interfaces";
import { GetServerSideProps, NextPage } from "next";


interface Props {
    client: IClient
}

export const EmployeePage: NextPage<Props> = ({ client }) => {



    return (
        <>
            <ProjectLayout
            title={"Jobsite Management - Employees"}
            pageDescription={"The construction tool"}
            >

            {client.companyName}

            </ProjectLayout>
    </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {

    const { id = '' } = query;
    const client = await dbClient.getClientById( id.toString() );
    console.log(client)

    if ( !client ) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
  
    return {
        props: { 
          client: client
         }
    }
  }
  

export default EmployeePage