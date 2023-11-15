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
        return theme.palette.warning.main
      case 'user':
        return theme.palette.primary.main
    }      
  }

  const handleClick = ( url: string ) => {
    router.push(url)
}


  return (
    
    
      <Grid
        item
        textAlign="center"
        xs={3}
        sm={2}
        md={1.5}
        lg={1}
      >
        <IconButton
          onClick={ () => handleClick(`/user/${user._id}`)  }
          sx={{ p: 0.5 }}
        >
          {
            user?.name 
            ?
              <Avatar 
              sx={{
                color: theme.palette.background.default,
                fontSize: 25,
                width: 70, height: 70,
                bgcolor: handleAvatarColor,
              }}
              aria-label="recipe">
                {user.name[0]}{user.lastName[0]}
              </Avatar>
            : <></>
          }
        </IconButton>

        <Card sx={{ bgcolor:theme.palette.background.default, boxShadow: 0, height: 80, display:{xs:'none', sm:'block'} }}>
          <CardContent>
            <Typography sx={{ fontSize: 12 }} color="text.primary">
              {user.name}
            </Typography>
            <Typography sx={{ fontSize: 12 }} color="text.primary">
              {user.lastName}
            </Typography>
            <Typography sx={{ fontSize: 11 }} color="text.secondary">
              {user.possition}
            </Typography>
          </CardContent>
        </Card>

      </Grid>

  )

}
  