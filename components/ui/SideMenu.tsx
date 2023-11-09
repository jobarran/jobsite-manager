import { useContext } from "react"
import { useRouter } from "next/router"
import { UiContext } from "@/context/ui"
import { AuthContext } from "@/context/auth"
import { SideMenuItemListAdmin, SideMenuProject, SideMenuUser } from ".";
import { Box, Drawer, List } from "@mui/material"


export const SideMenu = () => {

    const router = useRouter()
    const { isMenuOpen, toggleSideMenu, activeProject } = useContext( UiContext )
    const { user } = useContext( AuthContext )  


  return (
    <Drawer
        open={ isMenuOpen }
        onClose={ toggleSideMenu }
        anchor='left'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out'}}
        transitionDuration={ 250 }
    >
        <Box sx={{ width: 250 }}>
            
        <List>

            {
                user?.role === 'admin' && (
                    activeProject === undefined
                    ? (
                        <SideMenuItemListAdmin/> 
                    )
                    : (
                        <>
                        <SideMenuProject activeProject={activeProject} /> 
                        <SideMenuItemListAdmin/> 
                        </>
                    ) 
                )
            }

            {
                user?.role === 'user' && (
                    activeProject === undefined
                    ? (
                        <SideMenuUser/> 
                    )
                    : (
                        <>
                        <SideMenuProject activeProject={activeProject} /> 
                        <SideMenuUser/> 
                        </>
                    ) 
                )
            }

      </List>
        </Box>
    </Drawer>
  )
}