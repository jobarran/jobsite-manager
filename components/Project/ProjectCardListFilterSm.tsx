import { Grid, FormControlLabel, Switch, useTheme, useMediaQuery } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'

interface Props {
    handleDisplay: any
}

export const ProjectCardListFilterSm:FC<Props> = (handleDisplay) => {

        const theme = useTheme()
        const matches = useMediaQuery(theme.breakpoints.up("md"));
    
        const [upcomingDisplay, setUpcomingDisplay] = useState(true)
        const [ongoingDisplay, setOngoingDisplay] = useState(true)
        const [finishedDisplay, setFinishedDisplay] = useState(true)
        const [othersDisplay, setOthersDisplay] = useState(true)
        const [ visibility, setVisibility ] = useState(true);
      
        useEffect(() => {
            const newVisibility = matches ? true : false;
            setVisibility(newVisibility);
        }, [matches]);

    const  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if ( event.target.value === 'upcoming' ) {
            setUpcomingDisplay(event.target.checked)
        } else if ( event.target.value === 'ongoing' ) {
            setOngoingDisplay(event.target.checked)
        } else if ( event.target.value === 'finished' ) {
            setFinishedDisplay(event.target.checked)
        } else if ( event.target.value === 'others' ) {
            setOthersDisplay(event.target.checked)
        } return
    };

    return (

        <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
            marginBottom={1}
        >
            <Grid item xs={0} sm={2} md={4}>
            </Grid>
            <Grid item xs={3} sm={2} md={1}>
                <FormControlLabel
                    value="upcoming"
                    control={
                        <Switch 
                            checked={upcomingDisplay}
                            onChange={handleChange}
                            color="warning"
                        />
                    }
                    label="Upcoming"
                    labelPlacement="bottom"
                />
            </Grid>
            <Grid item xs={3} sm={2} md={1}>
                <FormControlLabel
                    value="ongoing"
                    control={
                        <Switch
                            disabled
                            checked={ongoingDisplay}
                            onChange={handleChange}
                            color="primary" 
                        />
                    }
                    label="Ongoing"
                    labelPlacement="bottom"
                />
            </Grid>
            <Grid item xs={3} sm={2} md={1}>
                <FormControlLabel
                    value="finished"
                    control={
                        <Switch
                            checked={finishedDisplay}
                            onChange={handleChange}
                            color="secondary"
                        />
                    }
                    label="Finished"
                    labelPlacement="bottom"
                />
                </Grid>
                <Grid item xs={3} sm={2} md={1}>
                <FormControlLabel
                    value="others"
                    control={
                        <Switch
                            checked={othersDisplay}
                            onChange={handleChange}
                            color="info"
                        />
                    }
                    label="Others"
                    labelPlacement="bottom"
                />
            </Grid>
            <Grid item xs={0} sm={2} md={4}>
            </Grid>
        </Grid>

    )
}
