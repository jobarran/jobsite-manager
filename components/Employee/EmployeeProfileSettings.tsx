import { Grid, Card, Box, useTheme, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Button } from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { red } from '@mui/material/colors';
import { EmployeeProfileInformationConfig, EmployeeProfileMenu } from '../../config/employeeProfileMenu';
import { EmployeeProfileInformation } from '.';
import { dbEmployee } from '@/database';
import { GetServerSideProps } from 'next';
import { IEmployee } from '@/interfaces';
import { ChangeEvent, FC, useState } from 'react';

interface Props {
    employee: IEmployee
}


export const EmployeeProfileSettings:FC<Props> = ({ employee }) => {

    const theme = useTheme()
    const [values, setValues] = useState(employee)

   
    
    return (

        <Grid container item spacing={2} xs={12} lg={9}>
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
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    )
}