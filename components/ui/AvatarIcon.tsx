import { AuthContext } from "@/context/auth";
import { Avatar, Box, IconButton, Link, Menu, MenuItem, Tooltip, Typography, useTheme } from "@mui/material";
import { signOut } from "next-auth/react";
import router, { useRouter } from "next/router";
import { FC, useContext, useState } from "react";
import Cookies from 'js-cookie';
import { border } from "@mui/system";


interface Props {
    name: string,
    lastName: string,
    role: string,
    legajo: string
}


export const AvatarIcon: FC<Props> = ( {name, lastName, role, legajo} ) => {

    const theme = useTheme()
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { logout, user } = useContext( AuthContext )
    const router = useRouter()

    const settings = [
        { name: 'Perfil', payload: 'ir a perfil'},
        { name: 'Cerrar sesión', payload: 'logout user' }
    ];

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleClick = (name: string ) => {

        if ( name === 'Cerrar sesión') {
          
          Cookies.set('CallbackUrl', `${ router.asPath }`)
          signOut();
            return
        }

        router.push({ pathname: '/user/[id]', query: { legajo: user?.idUser } });

        setAnchorElUser(null);
    };


  return (

    <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Cuenta">
              <IconButton onClick={ handleOpenUserMenu } sx={{ p: 0 }}>
                {
                  user?.name 
                  ?
                    <Avatar 
                    sx={{
                      color: theme.palette.info.light,
                      outline: "1px solid",
                      borderColor: theme.palette.primary.main,
                      fontSize: 15,
                      width: 30, height: 30,
                      bgcolor: "#2C4674" 
                    }}
                    aria-label="recipe">
                      {user?.name[0]! + user?.lastName[0]! }
                    </Avatar>
                  : <></>
                }
              </IconButton>
          </Tooltip>

      <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={ anchorElUser }
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={ Boolean(anchorElUser) } 
          onClose={ () => setAnchorElUser(null) }
      >
      {
          settings.map(({ name, payload }) => (
              <MenuItem
                key={ name }
                onClick={ (e) => handleClick(name) }
              >
                  <Typography textAlign="center">{ name }</Typography>
              </MenuItem>
        ))
      }
      </Menu>
    </Box>


 


  )
}