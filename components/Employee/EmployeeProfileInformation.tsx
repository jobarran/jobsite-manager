import { Grid, Box, Typography, TextField, IconButton, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import { IEmployee, IProject } from "@/interfaces";
import { EmployeeProfileInformationConfig, employeeStatus, projectStatus } from "@/config";
import { ChangeEvent, FC, useContext, useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';
import { jobSiteManagementApi } from "@/api";
import { capitalizeCamelCase } from "@/utils";
import ClearIcon from '@mui/icons-material/Clear';
import register from "@/pages/auth/register";
import { useProjects } from "@/hooks";
import { CompanyContext } from "@/context";


interface Props {
    employee: any,
    item: any,
    values: any,
    setValues: any,
}

interface FormValues {
    [key: string]: string;
  }

export const EmployeeProfileInformation:FC<Props> = ({item, values, setValues}) => {

    const { company } = useContext(CompanyContext)
    const [savedValues, setSavedValues] = useState(values)
    const [isEditable, setIsEditable] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const { projects, isLoading } = useProjects('/project')

    const handleInputChange = (fieldName: string) => (event: ChangeEvent<HTMLInputElement>) => {
        const updatedValues: FormValues = { ...values, [fieldName]: event.target.value };
        setValues(updatedValues);
      };

    const handleSelectChange = (event: SelectChangeEvent, fieldName:any) => {
        const updatedValues: FormValues = { ...values, [fieldName]: event.target.value };
        setValues(updatedValues);
    };

    const handleEdit = async (fieldName: string) => {
        if (!isEditable && item.editable) {
            setIsEditable(true)
        } else {
            setIsUpdating(true)
            try {
                const submitted = await jobSiteManagementApi.put(`/employee`, {
                    ...savedValues,
                    [fieldName]: values[fieldName]
                })  
                if (submitted.statusText === 'OK') {
                    setSavedValues(values)
                    setIsEditable(false)
                    setTimeout(() => {
                        setIsUpdating(false)
                    }, 750);
                }
            } catch (error) {
                console.log(error)
                setTimeout(() => {
                    setIsUpdating(false)
                }, 750);
            }
        }
    }

    const handleMenuItems = () => {
        switch (item.name) {
            case 'field':
                return (
                    company?.settings.employeeFields.map((field: string) => 
                    <MenuItem key={field} value={field}>{field}</MenuItem>
                )
            )
            case 'role':
                return (
                    company?.settings.employeeRoles.map((role: string) => 
                    <MenuItem key={role} value={role}>{role}</MenuItem>
                )
            )
            case 'project':
                return (
                    projects.map((project:IProject) => 
                    <MenuItem key={project.idProject} value={project.idProject}>{project.idProject}</MenuItem>
                )
            )
            case 'status':
                return (
                    item.options.map((status: string) => 
                        <MenuItem key={status} value={status}>{status}</MenuItem>
                    )
                )
        
            default:
                break;
        }
    }

    const handleInputField = () => {

        switch (item.type) {
            case 'TextField':
                return (
                    <TextField
                        value={`${values[item.name]}` || ''}
                        size="small"
                        sx={{ml:{xs:1, sm:3}, width:'100%'}}
                        onChange={handleInputChange(item.name)}
                        multiline={item.name === 'description'}
                        rows={2}
                        disabled={ !isEditable }
                    />
                )  
            case 'Select':
                return (
                    <Select
                        size="small"
                        defaultValue=""
                        value={`${values[item.name]}` || ''}
                        sx={{ml:{xs:1, sm:3}, width:'100%'}}
                        disabled={ !isEditable }
                        onChange={(event)=>handleSelectChange(event, item.name)}
                    >
                        {handleMenuItems()}
                    </Select>
                )
            default:
                break;
        }


    }

    const handleCancelEdit = (fieldName: string) => {
        setValues({
            ...values,
            [fieldName]: savedValues[fieldName]
        })
        setIsEditable(false)
    }
    

    return (

        <Box
            key={item.name}
            display="flex"
            flexDirection="row"
            alignItems="center"
            margin={1}
        >
            <Box sx={{display:{xs:'none', md:'flex'}}}>
                <Typography variant='body1' noWrap >
                    {capitalizeCamelCase(item.name)}:
                </Typography>
            </Box>


            {handleInputField()}
            
            
                {
                    isUpdating
                    ? <CircularProgress size="1.5rem" sx={{mr:7, ml:3}}/>
                    :
                        isEditable
                        ? 
                        <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                        >
                            <IconButton
                                color="primary"
                                onClick={()=>handleEdit(item.name)}
                                disabled={!item.editable}
                                sx={{ml:1}}
                            ><SaveIcon/></IconButton>
                            <IconButton
                                color="primary"
                                onClick={()=>handleCancelEdit(item.name)}
                                disabled={!item.editable}
                                sx={{mr:1}}
                            ><ClearIcon color="error"/></IconButton>
                        </Box>
                        : 
                        <IconButton
                            color="primary"
                            onClick={()=>handleEdit(item.name)}
                            sx={{mr:5, ml:2}}
                            disabled={!item.editable}
                        ><EditIcon/></IconButton>
                }
            <Box sx={{pr:{xs:'none', lg:10}}}></Box>
        </Box>

  )
}
