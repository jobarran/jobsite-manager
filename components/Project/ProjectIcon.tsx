import { Checkbox, FormControlLabel, Typography } from '@mui/material'
import React, { FC } from 'react'

interface Props {
    value:string,
    name:string,
    avatar:any,
    active: boolean,
    setClicked:any
}

export const ProjectIcon:FC<Props> = ({value, name, avatar, active, setClicked}) => {

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