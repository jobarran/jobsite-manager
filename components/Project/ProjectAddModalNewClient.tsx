import { jobSiteManagementApi } from "@/api";
import { projectStatus } from "@/config";
import { CompanyContext } from "@/context";
import { IClient } from "@/interfaces";
import { ErrorOutline } from "@mui/icons-material";
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { FC, useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";



interface Props {
    openClientModal: boolean
    handleCloseNewClientModal: any,
    setIsClientMutating: any
}

export const ProjectAddModalNewClient:FC<Props> = ({ openClientModal, handleCloseNewClientModal, setIsClientMutating}) => {


    const { control, register, handleSubmit, reset, formState: { errors }, } = useForm<IClient>()
    const [ showError, setShowError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('')
    const { company } = useContext( CompanyContext )

    
    
    const onSubmit: SubmitHandler<IClient> = async(data) => {

        try {
            setShowError(false)
            setErrorMessage('')
            const submitted = await jobSiteManagementApi.post(`/client/register`, {
                ...data,
                idCompany  : company?.idCompany || '',
                name       : data.name,
                lastName   : data.lastName,
                email      : data.email,
                companyName: data.companyName,
                phone      : data.phone,
                address    : data.address,
                description: data.description
  
            })
  
            if (submitted.statusText === 'OK') {
                onCloseModal()
                setIsClientMutating(true)
                setTimeout(() => {
                    setIsClientMutating(false)
                }, 1000);
            }

        } catch (error:any) {
            setErrorMessage(error.response.data.message)
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 3000);
        }
  
    }    

    const onCloseModal = () => {
        handleCloseNewClientModal()
        reset()
    }

  return (
      
    <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={openClientModal}
        onClose={onCloseModal}
    >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <DialogTitle>Add new client</DialogTitle>
            <DialogContent>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Chip 
                                label={errorMessage}
                                color="error"
                                icon={ <ErrorOutline /> }
                                className="fadeIn"
                                sx={{ display: showError ? 'flex': 'none', mb:2 }}
                            />
                        </Grid>
                        <Grid container sx={{ padding:'10px 0px 5px 15px' }} spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    size='small'
                                    label="Name"
                                    variant="outlined"
                                    fullWidth 
                                    { ...register('name', {
                                        required: 'Field required',
                                    })}
                                    error={ !!errors.name }
                                    helperText={ errors.name?.message }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    size='small'
                                    label="Last Name"
                                    variant="outlined"
                                    fullWidth 
                                    { ...register('lastName', {
                                        required: 'Field required',
                                    })}
                                    error={ !!errors.lastName }
                                    helperText={ errors.lastName?.message }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    size='small'
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    
                                    fullWidth 
                                    { ...register('email', {
                                        required: 'Field required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "invalid email address"
                                        }
                                    })}
                                    error={ !!errors.email }
                                    helperText={ errors.email?.message }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    size='small'
                                    label="Company Name"
                                    variant="outlined"
                                    fullWidth 
                                    { ...register('companyName', {
                                    })}
                                    error={ !!errors.companyName }
                                    helperText={ errors.companyName?.message }
                                />
                            </Grid>  
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    size='small'
                                    label="Phone"
                                    variant="outlined"
                                    fullWidth 
                                    { ...register('phone', {
                                    })}
                                    error={ !!errors.phone }
                                    helperText={ errors.phone?.message }
                                />
                            </Grid>   
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    size='small'
                                    label="Address"
                                    variant="outlined"
                                    fullWidth 
                                    { ...register('address', {
                                    })}
                                    error={ !!errors.address }
                                    helperText={ errors.address?.message }
                                />
                            </Grid>      
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    size='small'
                                    label="Description"
                                    multiline
                                    variant="outlined"
                                    fullWidth 
                                    rows={2}
                                    { ...register('description') }
                                />
                            </Grid>    
                        </Grid>          
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ mb:1, mr:1 }}>
                <Button color='error' onClick={onCloseModal}>Cancel</Button>
                <Button type="submit" >Subscribe</Button>
            </DialogActions>
        </form>
    </Dialog>

  );
}


