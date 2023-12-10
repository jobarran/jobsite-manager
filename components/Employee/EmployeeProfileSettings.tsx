import { Grid, Card, Box, useTheme, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Button } from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { red } from '@mui/material/colors';
import { EmployeeProfileInformationConfig, EmployeeProfileMenu } from '../../config/employeeProfileMenu';
import { EmployeeDeleteConfirmationModal, EmployeeProfileInformation, EmployeeProfileInformationEdit } from '.';
import { dbEmployee } from '@/database';
import { GetServerSideProps } from 'next';
import { IEmployee } from '@/interfaces';
import { ChangeEvent, FC, useContext, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { jobSiteManagementApi } from '@/api';
import { useRouter } from 'next/router';
import { CompanyContext } from '@/context';



interface Props {
    values: IEmployee
    toggleDataMutating: ()=>void
    setValues: any
}


export const EmployeeProfileSettings:FC<Props> = ({ values, toggleDataMutating, setValues }) => {

    const router = useRouter()
    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState({status: false, id:''})
    const { company } = useContext(CompanyContext)

    
    const handleDeleteEmployee = async () => {
        try {
            const submitted = await jobSiteManagementApi.delete(`/employee`, {
                data: {values}
            })  
            if (submitted.statusText === 'OK') {
                setOpenDeleteConfirmationDialog({status:false, id:''})
                toggleDataMutating()
                setTimeout(() => {
                    toggleDataMutating()
                }, 3000);
                router.push('/employee')
            }
        } catch (error) {
            console.log(error)
        }
    }

   
    
    return (

        <Grid container item spacing={2} xs={12} md={9}>
            <Grid item xs={12} height='100%'>
                <Card sx={{ boxShadow: 0 }} >
                    <Grid container>
                        <Grid item xs={2} sm={3}>
                            <Box  width='100%'>
                                <nav aria-label="main mailbox folders">
                                    <List>
                                        {
                                            EmployeeProfileMenu.map(employee => (
                                                <ListItem disablePadding key={employee.name} >
                                                    <ListItemButton >
                                                        <ListItemIcon >
                                                            <employee.avatar sx={{ fontSize:{xs:27, sm:22}, mr:2}}/>
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={employee.name}
                                                            sx={{display:{xs:'none', sm:'flex'}}}
                                                        />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </nav>
                            </Box>
                        </Grid> 
                        <Grid item xs={10} sm={9}>

                            {
                            company
                                ?
                                <EmployeeProfileInformationEdit
                                    values={values}
                                    setValues={setValues}
                                    handleDeleteEmployee={()=>handleDeleteEmployee()}
                                    employeeRoles={company?.settings.employeeRoles}
                                    employeeFields={company?.settings.employeeFields}
                                />
                                : <></>
                            }
    
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    )
}