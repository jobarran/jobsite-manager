import { Avatar, Divider, Grid, IconButton, Typography } from '@mui/material';
import { ProjectLayout } from "@/components/layouts";
import { useClients, useEmployees, useUsers } from '@/hooks';
import { EmployeeComponents, EmployeeUserList, EmployeeWorkersDataGrid } from '@/components/Employee';
import { FullScreenLoading } from '@/components/ui';






export const EmployeesPage = () => {

    const { users } = useUsers(`/users`)
    const { employees, isLoading, mutate } = useEmployees(`/employee`)

    return (

        <>
            <ProjectLayout
                title={"Jobsite Management - Employees"}
                pageDescription={"The construction tool"}
            >

                {
                    employees && !isLoading
                        ? <EmployeeComponents
                            employees={employees}
                            mutate={mutate}
                            users={users}
                        /> 
                        : <FullScreenLoading />
                }

            </ProjectLayout>
    </>
    
    )
}
  

export default EmployeesPage
