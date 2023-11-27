import { projectStatus } from "@/config";
import { IClient, IProject } from "@/interfaces";
import { ErrorOutline } from "@mui/icons-material";
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { SubmitHandler, useForm } from "react-hook-form";
import { ProjectAddModalNewClient } from ".";
import { useClients } from "@/hooks";
import { jobSiteManagementApi } from "@/api";
import { CompanyContext } from "@/context";



interface Props {
    openModal: boolean,
    setOpenModal: any,
    idCompany: string,
    isClientMutating: any,
    setOpenClientModal: any,
    setIsProjectMutating: any
}


export const ProjectAddModal:FC<Props> = ({ openModal, setOpenModal, idCompany, isClientMutating, setOpenClientModal, setIsProjectMutating}) => {


    const { control, register, handleSubmit, reset, formState: { errors }, } = useForm<IProject>()
    const { clients, mutate } = useClients(`/client`)
    const [ showError, setShowError ] = useState(false);
    const { company } = useContext( CompanyContext )


    useEffect(() => {
        mutate()
    }, [isClientMutating])    
    
    
    const onSubmit: SubmitHandler<IProject> = async(data) => {

        try {
            setShowError(false)
            const submitted = await jobSiteManagementApi.post(`/project/register`, {
                ...data,
                idCompany  : company?.idCompany || '',
                name       : data.name,
                idProject  : data.idProject,
                idClient   : data.idClient,
                description: data.description,
                status     : data.status
  
            })
  
            if (submitted.statusText === 'OK') {
                handleClose()
                setIsProjectMutating(true)
                setTimeout(() => {
                    setIsProjectMutating(false)
                }, 1000);
            }

        } catch (error) {
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 3000);
        }
  
    }
    
    const handleClose = () => {
        setOpenModal(false);
        reset()
    };

  return (
    
    <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={openModal}
        onClose={handleClose}
    >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <DialogTitle>Add new project</DialogTitle>
            <DialogContent>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Chip 
                                label="Ya tenemos una OM registrada con ese nombre"
                                color="error"
                                icon={ <ErrorOutline /> }
                                className="fadeIn"
                                sx={{ display: showError ? 'flex': 'none', mb:2 }}
                            />
                        </Grid>
                        <Grid container sx={{ padding:'10px 0px 5px 15px' }} spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    size='small'
                                    label="Project Name"
                                    variant="outlined"
                                    fullWidth 
                                    { ...register('name', {
                                        required: 'Field required',
                                        maxLength: 30
                                    })}
                                    error={ !!errors.name }
                                    helperText={ errors.name?.message }
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    size='small'
                                    label="ID"
                                    variant="outlined"
                                    fullWidth 
                                    { ...register('idProject', {
                                        required: 'Field required',
                                        maxLength: 5
                                    })}
                                    error={ !!errors.idProject }
                                    helperText={ errors.idProject?.message }
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Status"
                                    defaultValue=""
                                    { ...register('status', {
                                        required: 'Este campo es requerido',
                                    })}
                                    error={ !!errors.status }
                                >
                                    {
                                        projectStatus.map((status: string) => 
                                            <MenuItem key={status} value={status}>{status}</MenuItem>
                                        )
                                    }
                                </Select>
                                <FormHelperText error>{ errors.status ? errors.status?.message : '' }</FormHelperText>
                            </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={5} display='flex'>
                            <FormControl fullWidth size="small">
                                <InputLabel>Client</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Client"
                                    defaultValue=""
                                    { ...register('idClient', {
                                        required: 'Required',
                                    })}
                                    error={ !!errors.idClient }
                                >
                                    {
                                        clients.length !== 0
                                            ?
                                                clients.map((client: IClient) => 
                                                    <MenuItem
                                                        key={client.email}
                                                        value={client.email}
                                                    >
                                                        {
                                                            client.companyName !== ''
                                                            ? client.companyName
                                                            : client.name + ' ' + client.lastName
                                                        }
                                                    </MenuItem>
                                                )
                                            :''
                                    }
                                </Select>
                                <FormHelperText error>{ errors.status ? errors.status?.message : '' }</FormHelperText>
                            </FormControl>
                                <IconButton
                                    onClick={()=>setOpenClientModal(true)}
                                    color={ 'info' }
                                    aria-label="add"
                                    sx={{ml:1}}
                                >
                                    <PersonAddIcon/>
                                </IconButton>
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
                <Button color='error' onClick={handleClose}>Cancel</Button>
                <Button type="submit" >Subscribe</Button>
            </DialogActions>
        </form>
    </Dialog>

  );
}


