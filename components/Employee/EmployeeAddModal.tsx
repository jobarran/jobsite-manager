import { jobSiteManagementApi } from "@/api";
import { employeeStatus } from "@/config";
import { CompanyContext } from "@/context";
import { useProjects } from "@/hooks";
import { IClient, IEmployee, IProject } from "@/interfaces";
import { ErrorOutline } from "@mui/icons-material";
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { FC, useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";



interface Props {
    openEmployeeModal: boolean
    handleCloseEmployeeModal: any,
    toggleDataMutating: any,
    employeeRoles: any,
    employeeFields: any
}

export const EmployeeAddModal:FC<Props> = ({ openEmployeeModal, handleCloseEmployeeModal, toggleDataMutating, employeeRoles, employeeFields}) => {

    const { control, register, handleSubmit, reset, formState: { errors }, setValue } = useForm<IEmployee>()
    const [ showError, setShowError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('')
    const { projects, isLoading } = useProjects('/project')
    const { company } = useContext( CompanyContext )
    const [ selected, setSelected] = useState({
        status: '',
        project: '',
        field: '',
        role: '',
    })

    const handleSelectChange = (newValue:any) => {
        setSelected({...selected, [newValue.target.name] : newValue.target.value})
        setValue( newValue.target.name, newValue.target.value, { shouldDirty: true })
    }

    const handleDatePickerChange = (field:any, newValue:any) => {
        if (dayjs.isDayjs(newValue)) {
            setValue(field, newValue.format('YYYY-MM-DD'), { shouldDirty: true });
        }
    }

    
    
    const onSubmit: SubmitHandler<IEmployee> = async(data) => {

        try {
            const submitted = await jobSiteManagementApi.post(`/employee`, {
                ...data,
                idCompany: company?.idCompany || '',
            }) 

            if (submitted.statusText === 'Created') {
                reset()
                setSelected({
                    status: '',
                    project: '',
                    field: '',
                    role: '',
                })
                handleCloseEmployeeModal()
                toggleDataMutating()
                setTimeout(() => {
                    toggleDataMutating()
                }, 3000);
            }
        } catch (error) {
            setShowError(true)
            setTimeout(() => { 
                setShowError(false)
            }, 3000);
        }

    }    

    const onCloseModal = () => {
        handleCloseEmployeeModal()
        reset()
    }

  return (
      
    <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={openEmployeeModal}
        onClose={onCloseModal}
    >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <DialogTitle>Add new Employee</DialogTitle>
            <DialogContent>
            <Grid item xs={12}>
                <Chip 
                    label="Ups! Something went wrong. Please try again!"
                    color="error"
                    icon={ <ErrorOutline /> }
                    className="fadeIn"
                    sx={{ display: showError ? 'flex': 'none', mb:2 }}
                />
            </Grid>
            

            <Grid container spacing={2} p={3}>

                <Grid item xs={12} sm={6}>
                    <TextField
                        size='small'
                        label="Name"
                        fullWidth
                        variant="outlined"
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
                        fullWidth
                        variant="outlined"
                        { ...register('lastName', {
                            required: 'Field required',
                        })}
                        error={ !!errors.lastName }
                        helperText={ errors.lastName?.message }
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        size='small'
                        label="ID"
                        fullWidth
                        variant="outlined"
                        { ...register('idNumber', {
                            required: 'Field required',
                        })}
                        error={ !!errors.idNumber }
                        helperText={ errors.idNumber?.message }
                    />
                </Grid>
                
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Status</InputLabel>
                        <Select
                            size='small'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Project"
                            value={selected ? selected.status : ''}
                            { ...register('status', {
                                required: 'Field required',
                            })}
                            onChange={handleSelectChange}
                            error={ !!errors.status }
                        >
                            {
                                employeeStatus.map((status: string) => 
                                    <MenuItem key={status} value={status}>{status}</MenuItem>
                                )
                            }
                        </Select>
                        <FormHelperText error>{ errors.status ? errors.status?.message : '' }</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Actual Project</InputLabel>
                        <Select
                            size='small'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Actual Project"
                            value={selected && projects && !isLoading ? selected.project : ''}
                            { ...register('project', {
                                required: 'Field required',
                            })}
                            onChange={handleSelectChange}
                            error={ !!errors.project }
                        >
                            {
                                projects.map((project:IProject) => 
                                    <MenuItem key={project.idProject} value={project.idProject}>{project.idProject}</MenuItem>
                                )
                            }
                        </Select>
                        <FormHelperText error>{ errors.status ? errors.status?.message : '' }</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        size='small'
                        label="Phone"
                        fullWidth
                        variant="outlined"
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
                        fullWidth
                        variant="outlined"
                        { ...register('address', {                            
                        })}
                        error={ !!errors.address }
                        helperText={ errors.address?.message }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid item >
                            <DatePicker
                                label="Birth"
                                format="YYYY-MM-DD"
                                disableFuture
                                { ...register('birth', { 
                                })}
                                onChange={(newValue)=>handleDatePickerChange('birth', newValue)}
                                slotProps={{
                                    textField: { size: 'small', fullWidth: true },                  
                                }}
                            />
                        </Grid>
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid item>
                            <DatePicker
                                label="Entry"
                                format="YYYY-MM-DD"
                                disableFuture
                                { ...register('entry', {     
                                })}
                                onChange={(newValue)=>handleDatePickerChange('entry', newValue)}
                                slotProps={{
                                    textField: { size: 'small', fullWidth: true },
                                }}
                            />
                        </Grid>
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Field</InputLabel>
                        <Select
                            size='small'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Field"
                            value={selected && company ? selected.field : ''}
                            { ...register('field', { 
                                required: 'Field required',                           
                            })}
                            onChange={handleSelectChange}
                            error={ !!errors.field }
                        >
                            {
                                company?.settings.employeeFields.map((field:string) => 
                                    <MenuItem key={field} value={field}>{field}</MenuItem>
                                )
                            }
                        </Select>
                        <FormHelperText error>{ errors.field ? errors.field?.message : '' }</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Role</InputLabel>
                        <Select
                            size='small'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Role"
                            value={selected && company ? selected.role : ''}
                            { ...register('role', {   
                                required: 'Field required',                         
                            })}
                            onChange={handleSelectChange}
                            error={ !!errors.role }
                        >
                            {
                                company?.settings.employeeFields.map((role:string) => 
                                    <MenuItem key={role} value={role}>{role}</MenuItem>
                                )
                            }
                        </Select>
                        <FormHelperText error>{ errors.role ? errors.role?.message : '' }</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        size='small'
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        { ...register('description', {                            
                        })}
                        error={ !!errors.description }
                        helperText={ errors.description?.message }
                    />
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


