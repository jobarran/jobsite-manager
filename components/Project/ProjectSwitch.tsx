import { FormControlLabel, Switch, Typography, useTheme } from '@mui/material'
import React, { FC } from 'react'

interface Props {
    label:string,
    checked:boolean,
    onChange:any,
}

export const ProjectSwitch:FC<Props> = ({checked, onChange, label }) => {

    const theme = useTheme()


    return (

        <FormControlLabel
            sx={{m:1}}
            value={'ongoing'}
            control={
                <Switch 
                    size="small"
                    checked={checked}
                    onChange={onChange}
                    sx={{
                        mt: 1,
                        ".MuiSwitch-thumb": {
                                backgroundColor: theme.palette.primary.main
                            },
                        ".MuiSwitch-track": {
                                backgroundColor: theme.palette.primary.main
                            },
                        "& .MuiSwitch-switchBase": {
                        "&.Mui-checked": {
                            "+ .MuiSwitch-track": {
                                backgroundColor: theme.palette.secondary.main
                            },
                            ".MuiSwitch-thumb": {
                                backgroundColor: theme.palette.secondary.main
                        }   
                            }
                            }
                    }}
                />
            }
            label={
                <Typography
                    sx={{ fontSize: 12, width: 47, mt: 1}}
                    align="center"
                >
                    {label}
                </Typography>
                
            }
            labelPlacement="bottom"
        />

    )
}