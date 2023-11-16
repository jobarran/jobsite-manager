import { useContext, useState } from 'react';
import { AuthLayout } from "@/components/layouts"
import { Alert, Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, Stack, TextField, Typography, createTheme, makeStyles, useTheme } from "@mui/material"
import { useForm } from 'react-hook-form'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/auth';
  
type FormData = {
  email   : string,
  password: string,
};

export const LoginPage = () => {
    
    const router = useRouter();
    const { 
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid, isSubmitted },
        reset,
        setFocus,
        clearErrors
    } = useForm<FormData>();
    const { loginUser } = useContext( AuthContext )
    const [showError, setShowError] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };
    const theme = useTheme()
   

    const onLoginUser = async ( { email, password }: FormData ) => {
        setShowError(false);
        const { hasError } = await loginUser(email, password)
        hasError ? setShowError(true) : setShowError(false);
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
        <form onSubmit={ handleSubmit(onLoginUser) } noValidate >
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
                                htmlFor="outlined-email"
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
                            label="Contraseña"
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

                    <Grid item flex={1}></Grid>
                    <Grid item>
                        <Button
                            sx={{
                                bgcolor: 'transparent',
                                '&:hover': {
                                    backgroundColor:'transparent',

                                }
                            }}
                        >Forgot password?</Button>
                    </Grid>

                    <Grid item xs={12}>
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
                                // bgcolor: 'transparent',
                            }}
                        >Log in</Button>
                    </Grid>

                    <Grid item flex={1}></Grid>
                    <Grid item >
                        <Typography
                            sx={{textAlign: "center", color: theme.palette.info.main}}
                            variant='caption'
                        >{`Dont't have a account?`}</Typography>
                        <Button
                            href="/auth/register"
                            sx={{
                                bgcolor: 'transparent',
                                '&:hover': {
                                    backgroundColor:'transparent',

                                }
                            }}
                        >Sign up</Button>
                    </Grid>
                    <Grid item flex={1}></Grid>

                </Grid>
            </Box>
        </form>
    </AuthLayout>

  )
}

export default LoginPage