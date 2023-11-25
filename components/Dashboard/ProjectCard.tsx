import { AuthContext } from "@/context/auth";
import { Avatar, Box, Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material"
import { useRouter } from "next/router";
import { FC, useContext } from "react"


interface Props {
  project: any,
  display: boolean
}

export const ProjectCard: FC<Props> = ({ project, display }) => {

  const { user } = useContext( AuthContext )
  const theme = useTheme()
  const router = useRouter()

  const handleAvatarColor = () => {
    if (user?.role === 'user' && !user?.project?.includes(project.idProject)) {
      return theme.palette.background.default
    }
    switch (project.status) {
      case 'upcoming':
        return theme.palette.warning.main
      case 'ongoing':
        return theme.palette.primary.main
      case 'finished':
        return theme.palette.secondary.light
    }      
  }

  const handleAvatarTextColor = () => {
    // if (user?.role === 'admin') {
    //   return theme.palette.background.default
    // }
    // if (user?.role === 'user' && user?.project?.includes(project.idProject)) {
    //   return theme.palette.background.default
    // }
    switch (project.status) {
      case 'upcoming':
        return theme.palette.primary.main
      case 'ongoing':
        return theme.palette.info.main
      case 'finished':
        return theme.palette.secondary.light
    }      
  }

  const handleAvatarBorderColor = () => {
    switch (project.status) {
      case 'upcoming':
        return theme.palette.primary.main
      case 'ongoing':
        return theme.palette.info.main
      case 'finished':
        return theme.palette.secondary.light
    }      
  }

  const handleClick = ( url: string ) => {
    router.push(url)
}

if (display) {

  return (
    <Tooltip title={ user?.role === 'user' && !user?.project?.includes(project.idProject) ? "Without access" : "" } followCursor>
      <Grid
        item
        xs={3}
        sm={2}
        lg={2}
        key={project.name}
        sx={{
          m:{xs:1, sm:0.5}
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <IconButton
            disabled={ user?.role === 'user' && !user?.project?.includes(project.idProject) }
            onClick={ () => handleClick(`/project/${project.idProject}`)  }
            sx={{ p: 1 }}
          >
            {
              user?.name 
              ?
                <Avatar 
                sx={{
                  color: handleAvatarTextColor,
                  fontSize: 13,
                  width: 55, height: 55,
                  border: user?.role === 'user' && !user?.project?.includes(project.idProject) ? 2 : 1,
                  borderColor: handleAvatarBorderColor,
                  bgcolor: 'transparent',
                }}
                aria-label="recipe">
                  {project.idProject}
                </Avatar>
              : <></>
            }
          </IconButton>
          <Typography variant="caption" sx={{ fontSize: 10, display: "flex", alignItems: "center" }}>
            {project.name}
          </Typography>
        </Box>
      </Grid>
    </Tooltip>

  )
} else return

}
  