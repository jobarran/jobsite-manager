import { IUser } from "@/interfaces"
import { Avatar, Grid, IconButton } from "@mui/material"
import { FC } from "react"
import { EmployeeUserAvatar } from "."

interface Props {
    users: IUser[]
}

export const EmployeeUserList:FC<Props> = ({ users }) => {

    return (

        <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{ mb: 3 }}
        >
            
            {
                users.map( user => (
                    <EmployeeUserAvatar
                        user={user}
                        key={user._id}
                    />
                ))
            }
        </Grid>

    )
}
