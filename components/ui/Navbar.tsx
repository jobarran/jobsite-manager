import NextLink from 'next/link'
import { AppBar, Box, IconButton, Link, Toolbar, Typography, useTheme } from "@mui/material"
import { useContext, useState } from 'react'
import { UiContext } from '@/context/ui'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { AuthContext } from '@/context/auth';
import { AvatarIcon } from '.';
import { CompanyContext } from '@/context';
import { capitalizaAndAddSpaces } from '../../utils/capitalizaAndAddSpaces';
import { grey } from '@mui/material/colors';


export const Navbar = () => {
    
    const theme = useTheme()

    const { isMenuOpen, toggleSideMenu } = useContext( UiContext )
    const { isLoggedIn, user, logout } = useContext( AuthContext ) 
    const { company } = useContext( CompanyContext )   

  return (
    <AppBar>
        <Toolbar variant="dense">

            <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                sx={{ mr: 2, color:grey[50]}}
                onClick={ toggleSideMenu }
            >
                <MenuOutlinedIcon />
            </IconButton>
            <NextLink href='/' passHref legacyBehavior>
                <Link display='flex' alignItems='center'>
                    <Typography variant='body1' color={theme.palette.info.light}>{ capitalizaAndAddSpaces(company?.name) }</Typography>
                </Link>
            </NextLink>

            <Box flex={ 1 } />
            
            <AvatarIcon/>



            {/* Pantallas peque{as} */}


            {/* Pantallas grandes */}          

        </Toolbar>
    </AppBar>
  )
}
