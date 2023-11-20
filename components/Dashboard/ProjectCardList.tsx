import { FC, useState, useEffect } from "react"
import { FormControlLabel, Grid, Switch } from "@mui/material"
import { ProjectCard } from "./ProjectCard";
import { QuickSearch } from ".";
import useQuickSearch from "@/hooks/useQuickSearch";

interface Props {
    projects: any;
}

export const ProjectCardList: FC<Props> = ({ projects }) => {

    const [upcomingDisplay, setUpcomingDisplay] = useState(true)
    const [ongoingDisplay, setOngoingDisplay] = useState(true)
    const [finishedDisplay, setFinishedDisplay] = useState(true)
    const [filteredData, setSearch, clearSearch] = useQuickSearch(projects);
    const [searchValue, setSearchValue] = useState('');    
    
  
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearch(value);
      setSearchValue(value);
    };

    const handleClearSearch = () => {
        clearSearch();
        setSearchValue('');
      };


    const  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if ( event.target.value === 'upcoming' ) {
            setUpcomingDisplay(event.target.checked)
        } else if ( event.target.value === 'ongoing' ) {
            setOngoingDisplay(event.target.checked)
        } else if ( event.target.value === 'finished' ) {
            setFinishedDisplay(event.target.checked)
        } return

    };

    const handleDisplay = (project:any) => {

        if ( project.status === 'upcoming' ) {
            return upcomingDisplay
        } else if ( project.status === 'ongoing' ) {
            return ongoingDisplay
        } else if ( project.status === 'finished' ) {
            return finishedDisplay
        } return true
    }
      

  return (

    <>
        <Grid
            container
            spacing={0}
            alignItems="center"
            justifyContent="center"
            marginBottom={3}
        >
            <Grid item xs={1} sm={2} md={3}></Grid>
            <Grid item xs={10} sm={8} md={6}>
                <QuickSearch
                    searchValue={searchValue}
                    handleSearchChange={handleSearchChange}
                    handleClearSearch={handleClearSearch}
                /> 
            </Grid>
            <Grid item xs={1} sm={2} md={3}></Grid>

            <Grid item xs={1} sm={3} md={4.5}>
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
            <Grid item xs={1} sm={3} md={4.5}>
            </Grid>
        </Grid>
    

        <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{ mb: '1.5rem' }}>
            
            {
                filteredData.map( project => (
                    <ProjectCard
                        key={project.name}
                        project={project}
                        display={handleDisplay(project)}
                    />
                ))
            }
        </Grid>
    
    </>
  )
}
