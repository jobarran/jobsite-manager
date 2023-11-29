import { AuthContext } from "@/context/auth";
import { IUser } from "@/interfaces";
import { Avatar, Box, Button, Card, CardActions, CardContent, Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material"
import { useRouter } from "next/router";
import { FC, useContext } from "react"


interface Props {
  user: IUser,
}

export const EmployeeUserAvatar: FC<Props> = ({ user }) => {

  const theme = useTheme()
  const router = useRouter()

  const handleAvatarColor = () => {
    switch (user.role) {
      case 'admin':
        return theme.palette.info.main
      case 'user':
        return 'transparent'
    }      
  }

  const handleAvatarBorder = () => {
    switch (user.role) {
      case 'admin':
        return theme.palette.info.light
      case 'user':
        return theme.palette.info.main
    }      
  }

  const handleClick = ( url: string ) => {
    router.push(url)
}


  return (
    
    
      <Grid
        item
        textAlign="center"
        xs={2}
        sm={1}
        md={1}
        lg={1}
      >
        <Tooltip title={`${user.name} ${user.lastName}`} arrow>
          <IconButton
            onClick={ () => handleClick(`/user/${user._id}`)  }
            sx={{ p: 0.5 }}
          >
            {
              user?.name 
              ?
                <Avatar 
                  sx={{
                    color: handleAvatarBorder,
                    fontSize: 15,
                    width: 40, height: 40,
                    bgcolor: handleAvatarColor,
                    border: 1,
                    borderColor: handleAvatarBorder,
                  }}
                  aria-label="recipe">
                    {user.name[0]}{user.lastName[0]}
                </Avatar>
              : <></>
            }
          </IconButton>
        </Tooltip>
      </Grid>

  )

}
  