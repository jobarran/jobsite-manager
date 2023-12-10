import { IEmployee } from '@/interfaces'
import { getSeniority } from '@/utils'
import { Avatar, Box, Grid, Typography } from '@mui/material'
import React, { FC } from 'react'

interface Props {
    employee: IEmployee
}

export const EmployeeProfileDataBig:FC<Props> = ({employee}) => {

    const seniority = () => {
        var date = new  Date()
        var newDate = (date.getFullYear() + '-' + date.getMonth()) + '-' + date.getDate()
        return getSeniority(employee.entry)
    }

        return (

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
    )
}
