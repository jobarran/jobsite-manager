import { IEmployee } from '@/interfaces'
import { getSeniority } from '@/utils'
import { Avatar, Box, Divider, Grid, Typography } from '@mui/material'
import React, { FC } from 'react'

interface Props {
    employee: IEmployee
}

export const EmployeeProfileDataSmall:FC<Props> = ({employee}) => {

    const seniority = () => {
        var date = new  Date()
        var newDate = (date.getFullYear() + '-' + date.getMonth()) + '-' + date.getDate()
        return getSeniority(employee.entry)
    }

        return (
        <>
            <Grid container margin={1}>
                <Grid item xs={5} sm={3} md={2} >
                    <Box display="flex" justifyContent="center" >
                        <Avatar
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 50, height: 50 }}
                        />
                    </Box>
                    <Box display="flex" justifyContent="center" >
                        <Typography variant="body1" sx={{ mt:1}}>
                            {employee.name} {employee.lastName}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" >
                        <Typography variant="body2">
                            ID: {employee.idNumber} ({employee.status})
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={7} sm={9} md={2}>
                    <Box display="flex" justifyContent="left" ml={2}>
                        <Typography variant="body2">
                            Project: {employee.project}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="left" ml={2}>
                        <Typography variant="body2">
                            Seniority: {seniority()} years
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="left" ml={2}>
                        <Typography variant="body2">
                            Role: {employee.role}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="left" ml={2}>
                        <Typography variant="body2">
                            Field: {employee.field}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="left" ml={2}>
                        <Typography variant="body2" sx={{ color:'#9e9e9e', textAlign:'center' }}>
                            {employee.description}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}



