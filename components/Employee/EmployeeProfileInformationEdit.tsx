import { EmployeeProfileInformationConfig, employeeStatus } from "@/config";
import { Grid, Button, TextField, Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, CircularProgress, LinearProgress } from "@mui/material";
import { FC, useContext, useState } from "react";
import { EmployeeDeleteConfirmationModal,  } from ".";
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from "react-hook-form";
import { IEmployee, IProject } from "@/interfaces";
import { useProjects } from "@/hooks";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { CompanyContext } from "@/context";
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';



interface Props {
    values: any,
    setValues: any,
    handleDeleteEmployee: any
}

interface FormValues {
    [key: string]: string;
  }

export const EmployeeProfileInformationEdit:FC<Props> = ({values, setValues, handleDeleteEmployee}) => {

    const { control, register, handleSubmit, reset, formState: { errors }, } = useForm<IEmployee>()
    const [openDeleteConfirmationDialog, setOpenDeleteConfirmationDialog] = useState({status: false, id:''})
    const { projects, isLoading } = useProjects('/project')
    const { company } = useContext(CompanyContext)
    const [isUpdating, setIsUpdating] = useState(false)
    const [isEditing, setIsEditing] = useState(false)



    const handleOpenDeleteDialog = (id: string) => {
        setOpenDeleteConfirmationDialog({status: true, id: id})
    }

    const handleSave = () => {
        setIsUpdating(true)
        setTimeout(() => {
            setIsUpdating(false)
            setIsEditing(false)
        }, 2000);
    }

    

    return (

        <>
            {
                isUpdating
                ?     
                    <Box sx={{ width: '100%', p: 0 }}>
                        <LinearProgress />
                    </Box>
                : <></>
            }

                <Grid container spacing={2} p={3}>

                    <EmployeeDeleteConfirmationModal
                        openDeleteConfirmationDialog={openDeleteConfirmationDialog}
                        setOpenDeleteConfirmationDialog={setOpenDeleteConfirmationDialog}
                        handleDeleteOm={() => handleDeleteEmployee()}
                        name={values.name}
                        lastName={values.lastName}
                    />

                    {
                        
                        isEditing
                        ?    
                            <Box
                                width={'100%'}
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    alignContent: 'center',
                                    justifyContent: 'end',
                                    mt: 1
                                }}
                            >
                                <Button
                                    sx={{mr:1}}
                                    color='primary'
                                    variant='contained'
                                    startIcon={<SaveIcon />}
                                    onClick={handleSave}
                                >
                                    Save
                                </Button>
                                <Button
                                    color='error'
                                    variant='outlined'
                                    startIcon={<CancelIcon />}
                                    onClick={()=>{}}
                                >
                                    Cancel
                                </Button>
                                
                            </Box>
                        :
                            <Box
                                width={'100%'}
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    alignContent: 'center',
                                    justifyContent: 'end',
                                    mt: 1
                                }}
                            >
                                <Button
                                    sx={{mr:1}}
                                    color='primary'
                                    variant='contained'
                                    startIcon={<EditIcon />}
                                    onClick={()=>setIsEditing(true)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    color='error'
                                    variant='outlined'
                                    startIcon={<DeleteIcon />}
                                    onClick={()=>handleOpenDeleteDialog(values.idNumber)}
                                >
                                    Delete
                                </Button>

                            </Box>

                    }

                    <Grid item xs={12} sm={6}>
                        <TextField
                            disabled={!isEditing}
                            size='small'
                            label="Name"
                            fullWidth
                            variant="outlined"
                            value={values ? values.name : ''}
                            { ...register('name', {
                                required: 'Debe indicar el sector',
                                
                            })}
                            error={ !!errors.name }
                            helperText={ errors.name?.message }
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                        <TextField
                            disabled={!isEditing}
                            size='small'
                            label="Last Name"
                            fullWidth
                            variant="outlined"
                            value={values ? values.lastName : ''}
                            { ...register('lastName', {
                                required: 'Debe indicar el sector',
                                
                            })}
                            error={ !!errors.lastName }
                            helperText={ errors.lastName?.message }
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            disabled={!isEditing}
                            size='small'
                            label="ID"
                            fullWidth
                            variant="outlined"
                            value={values ? values.idNumber : ''}
                            { ...register('idNumber', {
                                required: 'Debe indicar el sector',
                                
                            })}
                            error={ !!errors.idNumber }
                            helperText={ errors.idNumber?.message }
                        />
                    </Grid>
                    
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Status</InputLabel>
                            <Select
                                disabled={!isEditing}
                                size='small'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Project"
                                value={values ? values.status : ''}
                                { ...register('status', {
                                    required: 'Este campo es requerido',
                                })}
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
                                disabled={!isEditing}
                                size='small'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Actual Project"
                                value={values && projects && !isLoading ? values.project : ''}
                                { ...register('project', {
                                    required: 'Este campo es requerido',
                                })}
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
                            disabled={!isEditing}
                            size='small'
                            label="Phone"
                            fullWidth
                            variant="outlined"
                            value={values ? values.phone : ''}
                            { ...register('phone', {
                                required: 'Debe indicar el sector',
                                
                            })}
                            error={ !!errors.phone }
                            helperText={ errors.phone?.message }
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            disabled={!isEditing}
                            size='small'
                            label="Address"
                            fullWidth
                            variant="outlined"
                            value={values ? values.address : ''}
                            { ...register('address', {
                                required: 'Debe indicar el sector',
                                
                            })}
                            error={ !!errors.address }
                            helperText={ errors.address?.message }
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Grid item >
                                <DatePicker
                                    disabled={!isEditing}
                                    label="Birth"
                                    format="YYYY-MM-DD"
                                    disableFuture
                                    value={values ? dayjs(values.birth) : ''}
                                    // onChange={(newValue) => setDate(newValue)}
                                    slotProps={{
                                        textField: { size: 'small', fullWidth: true },                  
                                    }}
                                />
                            </Grid>
                        </LocalizationProvider>
                    </Grid>

                    
                    <Grid item xs={12} sm={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Grid item >
                                <DatePicker
                                    disabled={!isEditing}
                                    label="Entry"
                                    format="YYYY-MM-DD"
                                    disableFuture
                                    value={values ? dayjs(values.entry) : ''}
                                    // onChange={(newValue) => setDate(newValue)}
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
                                disabled={!isEditing}
                                size='small'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Field"
                                value={values && company?.settings.employeeFields.length !== 0 ? values.field : ''}
                                { ...register('field', {
                                    required: 'Este campo es requerido',
                                })}
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
                                disabled={!isEditing}
                                size='small'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Role"
                                value={values && company?.settings.employeeFields.length !== 0 ? values.role : ''}
                                { ...register('role', {
                                    required: 'Este campo es requerido',
                                })}
                                error={ !!errors.role }
                            >
                                {
                                    company?.settings.employeeRoles.map((role:string) => 
                                        <MenuItem key={role} value={role}>{role}</MenuItem>
                                    )
                                }
                            </Select>
                            <FormHelperText error>{ errors.role ? errors.role?.message : '' }</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            disabled={!isEditing}
                            size='small'
                            label="Description"
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            value={values ? values.description : ''}
                            { ...register('description', {
                                required: 'Debe indicar el sector',
                                
                            })}
                            error={ !!errors.description }
                            helperText={ errors.description?.message }
                        />
                    </Grid>

                </Grid>

            </>
  )
}
