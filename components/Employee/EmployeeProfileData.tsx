import { IEmployee } from "@/interfaces"
import employee from "@/pages/employee"
import { getSeniority, yearDif } from "@/utils"
import { Grid, Card, CardHeader, Avatar, Button, Divider, CardContent, Typography, useTheme, Box } from "@mui/material"
import { FC } from "react"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { grey } from "@ant-design/colors"
import { red } from "@mui/material/colors"
import bcrypt from 'bcryptjs';
import { getYearsBetweenDates } from '../../utils/getYearsBetweenDates';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

interface Props {
    employee: IEmployee
}


export const EmployeeProfileData:FC<Props> = ({employee}) => {

    const theme = useTheme()

    const seniority = () => {
        
        var date = new  Date()
        var newDate = (date.getFullYear() + '-' + date.getMonth()) + '-' + date.getDate()
        return getSeniority(employee.entry)
    }
    
    return (
        
        <Grid container item spacing={2} xs={12} lg={3} >
            <Grid item xs={12}>
                <Card sx={{ boxShadow: 0 }}>
                <Box bgcolor={theme.palette.primary.main} width='100%' height={20}></Box>

                    <Grid item xs={12} margin={2} >
                        <Box display="flex" justifyContent="center" >
                            <Avatar
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 100, height: 100 }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="center" >
                            <Typography variant="subtitle1" sx={{ mt:2}}>
                                {employee.name} {employee.lastName}
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="center" >
                            <Typography variant="body1">
                                ID: {employee.idNumber} ({employee.status})
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="center" >
                            <Typography variant="body1">
                                Project: {employee.project}
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="center" >
                            <Typography variant="body1">
                                Seniority: {seniority()} years
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="center" >
                            <Typography variant="body1">
                                Role: {employee.role}
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="center" >
                            <Typography variant="body1">
                                Field: {employee.field}
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="center" >
                            <Typography variant="body1" sx={{ color:'#9e9e9e', textAlign:'center' }}>
                                {employee.description}
                            </Typography>
                        </Box>
                    </Grid>
                    <Box bgcolor={theme.palette.info.main} width='100%' height={5}></Box>
                </Card>
            </Grid>
        </Grid>

    )
}
