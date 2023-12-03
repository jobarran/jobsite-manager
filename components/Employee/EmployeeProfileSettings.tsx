import { Grid, Card, Box, useTheme, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Button } from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { red } from '@mui/material/colors';
import { EmployeeProfileInformationConfig, EmployeeProfileMenu } from '../../config/employeeProfileMenu';
import { EmployeeDeleteConfirmationModal, EmployeeProfileInformation } from '.';
import { dbEmployee } from '@/database';
import { GetServerSideProps } from 'next';
import { IEmployee } from '@/interfaces';
import { ChangeEvent, FC, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { jobSiteManagementApi } from '@/api';
import { useRouter } from 'next/router';



interface Props {
    employee: IEmployee
    mutate: any
}


export const EmployeeProfileSettings:FC<Props> = ({ employee, mutate }) => {

    const theme = useTheme()
    const router = useRouter()
    const [values, setValues] = useState(employee)
    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState({status: false, id:''})

    const handleOpenDeleteDialog = (id: string) => {
        setOpenDeleteConfirmationDialog({status: true, id: id})
    }

    const handleDeleteEmployee = async () => {
        try {
            const submitted = await jobSiteManagementApi.delete(`/employee`, {
                data: {values}
            })  
            console.log(submitted.statusText)
            if (submitted.statusText === 'OK') {
                setOpenDeleteConfirmationDialog({status:false, id:''})
                mutate()
                router.push('/employee')
            }
        } catch (error) {
            console.log(error)
        }
    }

   
    
    return (

        <Grid container item spacing={2} xs={12} lg={9}>
            <EmployeeDeleteConfirmationModal
                openDeleteConfirmationDialog={openDeleteConfirmationDialog}
                setOpenDeleteConfirmationDialog={setOpenDeleteConfirmationDialog}
                handleDeleteOm={() => handleDeleteEmployee()}
                name={employee.name}
                lastName={employee.lastName}
            />
            <Grid item xs={12} height='100%'>
                <Card sx={{ boxShadow: 0 }} >
                    <Grid container>
                        <Grid item xs={3}>
                            <Box  width='100%'>
                                <nav aria-label="main mailbox folders">
                                    <List>
                                        {
                                            EmployeeProfileMenu.map(employee => (
                                                <ListItem disablePadding key={employee.name}>
                                                    <ListItemButton>
                                                        <ListItemIcon>
                                                            <employee.avatar/>
                                                        </ListItemIcon>
                                                        <ListItemText primary={employee.name} />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </nav>
                            </Box>
                        </Grid> 
                        <Grid item xs={9}>
                            <Grid
                                container
                                margin={2}
                                sx={{ display:{xs:'', md:'flex'} }}
                                direction="column"
                            >

                                {
                                    EmployeeProfileInformationConfig.map(item => (
                                        <EmployeeProfileInformation
                                            employee={employee}
                                            item={item}
                                            key={item.name}
                                            values={values}
                                            setValues={setValues}
                                           
                                        />
                                    ))
                                }
                            </Grid>
                            <Button
                                color='error'
                                variant='contained'
                                startIcon={<DeleteIcon />}
                                sx={{mb:3, ml:2}}
                                onClick={()=>handleOpenDeleteDialog(employee.idNumber)}
                            >
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    )
}