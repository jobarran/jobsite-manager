import { EmployeeProfileInformationConfig, employeeStatus } from "@/config";
import { Grid, Button, TextField, Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, CircularProgress, LinearProgress, Backdrop, Chip } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { EmployeeDeleteConfirmationModal,  } from ".";
import DeleteIcon from '@mui/icons-material/Delete';
import { SubmitHandler, useForm } from "react-hook-form";
import { IEmployee, IProject } from "@/interfaces";
import { useProjects } from "@/hooks";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { CompanyContext } from "@/context";
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { jobSiteManagementApi } from "@/api";
import { ErrorOutline } from "@mui/icons-material";



interface Props {
    values: any,
    setValues: any,
    handleDeleteEmployee: any,
    employeeRoles: any,
    employeeFields: any
}

export const EmployeeProfileInformationEdit:FC<Props> = ({values, setValues, handleDeleteEmployee, employeeRoles, employeeFields}) => {

    const { control, register, handleSubmit, reset, formState: { errors, isDirty }, setValue } = useForm<IEmployee>()
    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState({status: false, id:''})
    const { projects, isLoading } = useProjects('/project')
    const [isUpdating, setIsUpdating] = useState(false)
    const [ showError, setShowError ] = useState(false);
    const [ selected, setSelected] = useState({
        status: values.status,
        project:values.project,
        field:values.field,
        role:values.role,
    })

    const handleOpenDeleteDialog = (id: string) => {
        setOpenDeleteConfirmationDialog({status: true, id: id})
    }

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
            const submitted = await jobSiteManagementApi.put(`/employee`, {
                ...data,
                idNumber: values.idNumber
            }) 

            if (submitted.statusText === 'OK') {
                setValues({
                    ...data,
                    idNumber: values.idNumber
                })
                setIsUpdating(true)
                setTimeout(() => {
                    setIsUpdating(false)
                    reset({}, { keepValues: true });
                }, 2000);
            }
        } catch (error) {
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 3000);
        }

    }    

    return (

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isUpdating}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

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

                <EmployeeDeleteConfirmationModal
                    openDeleteConfirmationDialog={openDeleteConfirmationDialog}
                    setOpenDeleteConfirmationDialog={setOpenDeleteConfirmationDialog}
                    handleDeleteEmployee={() => handleDeleteEmployee()}
                    name={values.name}
                    lastName={values.lastName}
                />

                <Grid item xs={12} sm={6}>
                    <TextField
                        size='small'
                        label="Name"
                        fullWidth
                        variant="outlined"
                        defaultValue={values ? values.name : ''}
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
                        defaultValue={values ? values.lastName : ''}
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
                        defaultValue={values ? values.idNumber : ''}
                        { ...register('idNumber', {
                        })}
                        disabled
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
                        defaultValue={values ? values.phone : ''}
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
                        defaultValue={values ? values.address : ''}
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
                                defaultValue={values ? dayjs(values.birth) : ''}
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
                                defaultValue={values ? dayjs(values.entry) : ''}
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
                            value={selected && employeeFields.length !== 0 ? selected.field : ''}
                            { ...register('field', {                            
                            })}
                            onChange={handleSelectChange}
                            error={ !!errors.field }
                        >
                            {
                                employeeFields.map((field:string) => 
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
                            value={selected && employeeFields.length !== 0 ? selected.role : ''}
                            { ...register('role', {                            
                            })}
                            onChange={handleSelectChange}
                            error={ !!errors.role }
                        >
                            {
                                employeeRoles.map((role:string) => 
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
                        defaultValue={values ? values.description : ''}
                        { ...register('description', {                            
                        })}
                        error={ !!errors.description }
                        helperText={ errors.description?.message }
                    />
                </Grid>
                    
                    <Box
                        width={'100%'}
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignContent: 'center',
                            justifyContent: 'start',
                            mt: 2,
                            ml: 2
                        }}
                    >
                        <Button
                            disabled={!isDirty}
                            sx={{ 
                                borderColor:'transparent',
                                    '&.Mui-disabled': {
                                        borderColor:'transparent',
                                    }
                            }}
                            color='primary'
                            variant='outlined'
                            endIcon={<SaveIcon />}
                            type="submit"
                        >
                            Save
                        </Button>
                            
                    </Box>
                    
                    <Box
                        width={'100%'}
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignContent: 'center',
                            justifyContent: 'start',
                            ml: 2
                        }}
                    >

                        <Button
                            sx={{borderColor:'transparent'}}
                            color='error'
                            variant='outlined'
                            endIcon={<DeleteIcon />}
                            onClick={()=>handleOpenDeleteDialog(values.idNumber)}
                        >
                            Delete
                        </Button>

                    </Box>

                

            </Grid>
        </form>

  )
}
