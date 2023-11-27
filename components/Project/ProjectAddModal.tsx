import { projectStatus } from "@/config";
import { IProject } from "@/interfaces";
import { ErrorOutline } from "@mui/icons-material";
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { SubmitHandler, useForm } from "react-hook-form";
import { ProjectAddModalNewClient } from ".";



interface Props {
    openModal: boolean,
    setOpenModal: any,
    idCompany: string,
    setIsMutating: any,
    setOpenClientModal: any,
}


export const ProjectAddModal:FC<Props> = ({ openModal, setOpenModal, idCompany, setIsMutating, setOpenClientModal}) => {


    const { control, register, handleSubmit, reset, formState: { errors }, } = useForm<IProject>()
    const [ showError, setShowError ] = useState(false);
    
    
    const onSubmit: SubmitHandler<IProject> = async(data) => {

        try {
            setShowError(false)
            // const submitted = await adminObraApi.post(`/om`, {
            //     ...data,
            //     idObra     : idObra,
            //     name       : 'OM-'+ idObra + '-' + omName(data.name),
            //     revision   : omRevision(data.revision),
            //     floor      : data.floor,
            //     sector     : data.sector,
            //     description: data.description,
            //     status     : '-',
            //     necesidad  : '-',
            //     pedido     : '-',
            //     element    : elementRows
  
            // })
  
            // if (submitted.statusText === 'Created') {
            //     setIsMutating(true)
            //     setTimeout(() => {
            //         setIsMutating(false)
            //     }, 1000);
            //     setOpenModal(false)
            //     reset()
            //     setElementRows([])
            // }
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
                                        projectStatus.map((status: string) => 
                                            <MenuItem key={status} value={status}>{status}</MenuItem>
                                        )
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


