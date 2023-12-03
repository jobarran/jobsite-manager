import { Checkbox, FormControlLabel, Typography, checkboxClasses, useTheme } from '@mui/material'
import React, { FC } from 'react'

interface Props {
    value:string,
    name:string,
    avatar:any,
    active: boolean,
    setClicked:any
}

export const ProjectIcon:FC<Props> = ({value, name, avatar, active, setClicked}) => {

    const theme = useTheme()


    return (

        <FormControlLabel
            sx={{m:1}}
            key={value}
            value={name}
            control={
                <Checkbox
                    checked={ active }
                    icon={ avatar }
                    checkedIcon={ avatar }
                    onClick={setClicked}
                    sx={{ 
                        color: theme.palette.primary.main,
                        [`&.${checkboxClasses.checked}`]: {
                        color: theme.palette.secondary.main,
                    }, }}
                />
            }
            label={
                <Typography sx={{ fontSize: 12 }}>
                {name}
                </Typography>
            }
            labelPlacement="bottom"
        />

    )
}