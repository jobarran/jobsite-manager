import { Avatar, Divider, Grid, IconButton, Typography, CardContent, Button, Card, CardHeader, useTheme } from '@mui/material';
import { ProjectLayout } from "@/components/layouts";
import { GetServerSideProps, NextPage } from 'next';
import { dbEmployee } from '@/database';
import { IEmployee } from '@/interfaces';
import { yearDif } from '@/utils';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { CustomBreadCrumbs } from '@/components/ui';
import { useRouter } from 'next/router';
import { EmployeeProfileData, EmployeeProfileSettings } from '@/components/Employee';

interface Props {
    employee: IEmployee
}

export const EmployeePage:NextPage<Props> = ({employee}) => {

    const theme = useTheme()
    const router = useRouter()

    const breadcrumbsRef = [
        { key: 'employees', name: 'Employees', link: '/employee' },
        { key: 'employee', name: `${employee.name} ${employee.lastName}` , link: undefined },
      ]


    return (
        <>
            <ProjectLayout
                title={`Jobsite Management - ${ employee.name } ${ employee.lastName }`}
                pageDescription={"The construction tool"}
            >

            <CustomBreadCrumbs references={ breadcrumbsRef }/>

            <Grid container spacing={2}>
                
                <EmployeeProfileData employee={employee}/>
                <EmployeeProfileSettings employee={employee}/>
  
            </Grid>

            </ProjectLayout>
    </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {

    const { id = '' } = query;
    const employee = await dbEmployee.getEmployeeById( id.toString() );

    if ( !employee ) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
  
    return {
        props: { 
          employee: employee
         }
    }
  }
  

export default EmployeePage