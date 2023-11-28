import { Avatar, Divider, Grid, IconButton, Typography } from '@mui/material';
import { ProjectLayout } from "@/components/layouts";
import { useClients, useEmployees, useUsers } from '@/hooks';
import { EmployeeUserList, EmployeeWorkersTable } from '@/components/Employee';
import { CustomDataGrid } from '@/components/DataGrid';






export const EmployeesPage = () => {

    const { users } = useUsers(`/users`)
    const { clients, isLoading } = useClients(`/client`)

    return (
        <>
            <ProjectLayout
                title={"Jobsite Management - Employees"}
                pageDescription={"The construction tool"}
            >
            
                
                <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    sx={{ mb: '1.5rem', mt: '1.5rem' }}>

                    {
                        isLoading
                        ? <></>
                        : <CustomDataGrid data={clients} /> 
                    }
                    
                    
                    
                </Grid>

            </ProjectLayout>
    </>
    )
}
  

export default EmployeesPage
