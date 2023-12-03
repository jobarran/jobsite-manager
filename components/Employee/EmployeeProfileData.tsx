import { IEmployee } from "@/interfaces"
import { Grid, Card, useTheme, Box, useMediaQuery } from "@mui/material"
import { FC, useEffect, useState } from "react"
import { EmployeeProfileDataBig, EmployeeProfileDataSmall } from "."

interface Props {
    employee: IEmployee
}


export const EmployeeProfileData:FC<Props> = ({employee}) => {

    const theme = useTheme()
    const [bigScreen, setBigScreen] = useState(true)
    const matches = useMediaQuery(theme.breakpoints.up("lg"));

    useEffect(() => {
        matches ? setBigScreen(true) : setBigScreen(false);
        console.log(bigScreen)
    }, [matches]);
    
    return (
        
        <Grid container item spacing={2} xs={12} lg={3} >
            <Grid item xs={12}>
                <Card sx={{ boxShadow: 0 }}>
                <Box bgcolor={theme.palette.primary.main} width='100%' height={20}></Box>

                    {
                        bigScreen
                        ? <EmployeeProfileDataBig employee={employee} />
                        : <EmployeeProfileDataSmall employee={employee} />
                    }
                    
                    
                    <Box bgcolor={theme.palette.info.main} width='100%' height={5}></Box>
                </Card>
            </Grid>
        </Grid>

    )
}
