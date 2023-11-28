import { Avatar, Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import { ProjectLayout } from "@/components/layouts";
import { useEmployees, useUsers } from '@/hooks';
import { EmployeeUserList, EmployeeWorkersTable } from '@/components/Employee';
import { useClients } from '../../hooks/useClients';
import { CustomDataGrid } from '../../components/DataGrid';






export const EmployeesPage = () => {

    const { clients, isLoading } = useClients(`/client`)

    return (
        <>
            <ProjectLayout
                title={"Jobsite Management - Clients"}
                pageDescription={"The construction tool"}
            >
                <Grid
                    container
                    alignItems='center'
                    display="flex"
                    direction="column"
                >
                    <Grid
                        container
                        maxWidth={800}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box
                            width='100%'
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignContent: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mt: 1
                            }}
                        >

                            {
                                isLoading
                                ? <></>
                                : <CustomDataGrid data={clients} /> 
                            }
                        </Box>
                    </Grid>
                </Grid>
            </ProjectLayout>
    </>
    )
}
  

export default EmployeesPage
