import { Grid, Box, Typography, TextField, IconButton } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import { IEmployee } from "@/interfaces";
import { EmployeeProfileInformationConfig } from "@/config";
import { ChangeEvent, FC, useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';
import { jobSiteManagementApi } from "@/api";
import { capitalizeCamelCase } from "@/utils";
import ClearIcon from '@mui/icons-material/Clear';


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

    const [savedValues, setSavedValues] = useState(values)
    const [isEditable, setIsEditable] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)


    const handleInputChange = (fieldName: string) => (event: ChangeEvent<HTMLInputElement>) => {
        const updatedValues: FormValues = { ...values, [fieldName]: event.target.value };        setValues(updatedValues);
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
            
            <TextField
                value={`${values[item.name]}`}
                size="small"
                sx={{ml:{xs:1, sm:3}, width:'100%'}}
                onChange={handleInputChange(item.name)}
                multiline={item.name === 'description'}
                rows={2}
                disabled={ !isEditable }
            />
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
