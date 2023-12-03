import { Grid, Box, Typography, TextField, IconButton } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import { IEmployee } from "@/interfaces";
import { EmployeeProfileInformationConfig } from "@/config";
import { ChangeEvent, FC, useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';
import { jobSiteManagementApi } from "@/api";
import { capitalizeCamelCase } from "@/utils";


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

    const [isEditable, setIsEditable] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const updatedValues: FormValues = { ...values, [item.name]: event.target.value };
        setValues(updatedValues);
      };

    const handleEdit = async () => {
        if (!isEditable) {
            setIsEditable(true)
        } else {
            setIsUpdating(true)
            try {
                const submitted = await jobSiteManagementApi.put(`/employee`, {
                    values
                })  
                console.log(submitted.statusText)
                if (submitted.statusText === 'OK') {
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
    

    return (

        <Box
            key={item.name}
            display="flex"
            flexDirection="row"
            alignItems="center"
            margin={1}
        >
            <Box>
                <Typography variant='body1' noWrap >
                    {capitalizeCamelCase(item.name)}:
                </Typography>
            </Box>
            
            <TextField
                value={`${values[item.name]}`}
                size="small"
                sx={{ml:3, width:'100%'}}
                onChange={handleInputChange}
                multiline={item.name === 'description'}
                rows={2}
                disabled={!isEditable}
            />
            <IconButton
                color="primary"
                aria-label="add to shopping cart"
                onClick={handleEdit}
                sx={{mr:5, ml:2}}
            >
                {
                    isUpdating
                    ? 
                            <CircularProgress size="1.5rem"/>
                    :
                        isEditable
                        ? <SaveIcon />
                        : <EditIcon />
                }
            </IconButton>
            <Box sx={{pr:{xs:'none', lg:10}}}></Box>
        </Box>

  )
}
