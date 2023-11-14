import { useContext, useEffect, useState } from 'react';
import { AuthLayout } from "@/components/layouts"
import { Alert, Box, Button, Chip, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, Stack, TextField, Typography, createTheme, makeStyles, useTheme } from "@mui/material"
import { useForm } from 'react-hook-form'
import { ErrorOutline, Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import Cookies from 'js-cookie';
import { AuthContext } from '@/context/auth';
import { jobSiteManagementApi } from '@/api';
import { convertToSlug } from '@/utils';
import axios from 'axios';
  
type FormData = {
    name       : string,
    lastName   : string,
    email      : string,
    password   : string,
    companyName: string,
};

export const LoginPage = () => {
    
    const { data, status } = useSession();
    const router = useRouter();
    const { registerUser, loginUser } = useContext( AuthContext );
    const { 
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid, isSubmitted },
        reset,
        setFocus,
        clearErrors
    } = useForm<FormData>();
    const [showError, setShowError] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };
    const theme = useTheme()

    const onRegisterForm = async( {  name, lastName, email, password, companyName }: FormData ) => {
        
        setShowError(false);
        const { hasError } = await registerUser(name, lastName, email, password, companyName)

        if (hasError) {
            setShowError(true)
        }
        //TODO: create company
        //TODO: userId Bug
        loginUser(email, password)
        setShowError(false)
    }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowError(false);
  };


  return (

    <AuthLayout title={"Login"} >
        <Snackbar open={showError} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">Sorry, your password was incorrect. Please double-check!</Alert>
        </Snackbar>
        <form onSubmit={ handleSubmit(onRegisterForm) }  >
            <Box sx={{ 
                
                width:350, 
                padding:'10px 20px',
                borderStyle: 'solid', 
                borderRadius: 4,
                borderWidth: 1,
                borderColor: theme.palette.info.light,
                textAlign: "center"
            }}>
                <Typography
                    variant="h1"
                    component='h1'
                    color={theme.palette.info.light}
                    sx={{
                        fontSize:30,
                        mt: 1
                    }}
                >JobSite Management</Typography>
                <Typography
                    variant="body2"
                    color={theme.palette.info.light}
                    sx={{
                        fontSize:15,
                        color: theme.palette.info.main
                    }}
                >The construction tool</Typography>
                <Grid container>
                </Grid>
                <Grid container spacing={1}>

                    <Grid item xs={12} sx={{ mt:2}}>
                        <FormControl sx={{ width: '100%' }} variant="outlined">
                            <InputLabel
                                htmlFor="outlined-adornment-name"
                                sx={{
                                    color: theme.palette.info.light,
                                    '&.Mui-focused': {
                                        color: theme.palette.info.light
                                      }
                                }}
                            >Name</InputLabel>
                            <OutlinedInput
                                color='info'
                                id="outlined-name"
                                label="name"
                                fullWidth
                                sx={{
                                    input: {
                                        color: theme.palette.info.light,
                                    },
                                    "& .MuiOutlinedInput-notchedOutline" : {
                                        borderColor : theme.palette.info.light,
                                        borderWidth: 'thin',
                                        opacity: '50%'
                                     },
                                     "&:hover > .MuiOutlinedInput-notchedOutline" : {
                                        borderColor : theme.palette.info.main,
                                     },
                                     "&:focused > .MuiOutlinedInput-notchedOutline" : {
                                       borderColor : theme.palette.info.light
                                    }
                                    
                                  }}
                                { ...register('name', {
                                    required: 'Name is required',
                                })}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sx={{ mt:2}}>
                        <FormControl sx={{ width: '100%' }} variant="outlined">
                            <InputLabel
                                htmlFor="outlined-adornment-lastname"
                                sx={{
                                    color: theme.palette.info.light,
                                    '&.Mui-focused': {
                                        color: theme.palette.info.light
                                      }
                                }}
                            >Last Name</InputLabel>
                            <OutlinedInput
                                color='info'
                                id="outlined-lastName"
                                label="lastName"
                                fullWidth
                                sx={{
                                    input: {
                                        color: theme.palette.info.light,
                                    },
                                    "& .MuiOutlinedInput-notchedOutline" : {
                                        borderColor : theme.palette.info.light,
                                        borderWidth: 'thin',
                                        opacity: '50%'
                                     },
                                     "&:hover > .MuiOutlinedInput-notchedOutline" : {
                                        borderColor : theme.palette.info.main,
                                     },
                                     "&:focused > .MuiOutlinedInput-notchedOutline" : {
                                       borderColor : theme.palette.info.light
                                    }
                                    
                                  }}
                                { ...register('lastName', {
                                    required: 'Lastname is required',
                                })}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sx={{ mt:2}}>
                        <FormControl sx={{ width: '100%' }} variant="outlined">
                            <InputLabel
                                htmlFor="outlined-adornment-email"
                                sx={{
                                    color: theme.palette.info.light,
                                    '&.Mui-focused': {
                                        color: theme.palette.info.light
                                      }
                                }}
                            >Email</InputLabel>
                            <OutlinedInput
                                color='info'
                                id="outlined-email"
                                label="email"
                                fullWidth
                                sx={{
                                    input: {
                                        color: theme.palette.info.light,
                                    },
                                    "& .MuiOutlinedInput-notchedOutline" : {
                                        borderColor : theme.palette.info.light,
                                        borderWidth: 'thin',
                                        opacity: '50%'
                                     },
                                     "&:hover > .MuiOutlinedInput-notchedOutline" : {
                                        borderColor : theme.palette.info.main,
                                     },
                                     "&:focused > .MuiOutlinedInput-notchedOutline" : {
                                       borderColor : theme.palette.info.light
                                    }
                                    
                                  }}
                                { ...register('email', {
                                    required: 'Email is required',
                                })}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}  sx={{ mt:1}}>
                        <FormControl sx={{ width: '100%' }} variant="outlined">
                        <InputLabel
                            htmlFor="outlined-adornment-company"
                            sx={{
                                color: theme.palette.info.light,
                                '&.Mui-focused': {
                                    color: theme.palette.info.light
                                  }
                            }}
                        >Company Name</InputLabel>
                        <OutlinedInput
                            color='info'
                            id="outlined-company"
                            type={"text"}
                            label="Company Name"
                            fullWidth
                            sx={{
                                input: {
                                    color: theme.palette.info.light,
                                },
                                "& .MuiOutlinedInput-notchedOutline" : {
                                    borderColor : theme.palette.info.light,
                                    borderWidth: 'thin',
                                    opacity: '50%'
                                 },
                                 "&:hover > .MuiOutlinedInput-notchedOutline" : {
                                    borderColor : theme.palette.info.main,
                                 },
                                 "&:focused > .MuiOutlinedInput-notchedOutline" : {
                                   borderColor : theme.palette.info.light
                                }
                              }}
                            { ...register('companyName', {
                                required: 'Company Name is required',
                            })}
                        />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}  sx={{ mt:1}}>
                        <FormControl sx={{ width: '100%' }} variant="outlined">
                        <InputLabel
                            htmlFor="outlined-adornment-password"
                            sx={{
                                color: theme.palette.info.light,
                                '&.Mui-focused': {
                                    color: theme.palette.info.light
                                  }
                            }}
                        >Password</InputLabel>
                        <OutlinedInput
                            color='info'
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment  position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword
                                        ?   <VisibilityOff
                                                sx={{
                                                    color: theme.palette.info.light
                                                }}
                                            />
                                        :   <Visibility
                                                sx={{
                                                    color: theme.palette.info.light
                                                }}
                                            />
                                        }
                                    </IconButton>
                                </InputAdornment>
                        }
                            label="password"
                            fullWidth
                            sx={{
                                input: {
                                    color: theme.palette.info.light,
                                },
                                "& .MuiOutlinedInput-notchedOutline" : {
                                    borderColor : theme.palette.info.light,
                                    borderWidth: 'thin',
                                    opacity: '50%'
                                 },
                                 "&:hover > .MuiOutlinedInput-notchedOutline" : {
                                    borderColor : theme.palette.info.main,
                                 },
                                 "&:focused > .MuiOutlinedInput-notchedOutline" : {
                                   borderColor : theme.palette.info.light
                                }
                              }}
                            { ...register('password', {
                                required: 'Password is required',
                            })}
                        />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} mt={2}>
                        <Button
                            variant="outlined"
                            type='submit'
                            size="small"
                            sx={{
                                width:'100%',
                                color: theme.palette.info.light,
                                borderColor: theme.palette.info.light,
                                '&:hover': {
                                    backgroundColor: theme.palette.info.light,
                                    color: theme.palette.primary.main,
                                    borderColor: theme.palette.info.light,

                                }
                            }}
                        >Sign up</Button>
                    </Grid>

                    <Grid item flex={1}></Grid>
                    <Grid item >
                        <Typography
                            sx={{textAlign: "center", color: theme.palette.info.main}}
                            variant='caption'
                        >Have an account?</Typography>
                        <Button
                            href="/auth/login"
                            sx={{
                                bgcolor: 'transparent',
                                '&:hover': {
                                    backgroundColor:'transparent',

                                }
                            }}
                        >Log in</Button>
                    </Grid>
                    <Grid item flex={1}></Grid>

                </Grid>
            </Box>
        </form>
    </AuthLayout>

  )
}

export default LoginPage