import { Avatar, Divider, Grid, IconButton, Typography } from '@mui/material';
import { ProjectLayout } from "@/components/layouts";
import { useEmployees, useUsers } from '@/hooks';
import { EmployeeUserList, EmployeeWorkersTable } from '@/components/Employee';






export const EmployeesPage = () => {

    const { users } = useUsers(`/users`)
    const { employees, error, isLoading } = useEmployees(`/employee`)

    console.log(users)



    return (
        <>
            <ProjectLayout
                title={"Jobsite Management - Employees"}
                pageDescription={"Probando github"}
            >
            
            <>
                <EmployeeUserList users={users} />

                <Divider></Divider>
                
                <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    sx={{ mb: '1.5rem', mt: '1.5rem' }}>

                    {
                        employees && !isLoading
                        ?
                        <EmployeeWorkersTable data={employees} />  
                        : <></>
                    }
                    
                    
                    
                </Grid>
            </>

            </ProjectLayout>
    </>
    )
}
  

export default EmployeesPage
