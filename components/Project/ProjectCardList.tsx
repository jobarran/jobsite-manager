import { FC, useState } from "react"

import { Box, Divider, FormControlLabel, Grid, IconButton, Typography } from "@mui/material"
import AddBoxIcon from '@mui/icons-material/AddBox';

import { ProjectCard, ProjectIcon, ProjectSwitch, ProjectTable, QuickSearch } from ".";
import useQuickSearch from "@/hooks/useQuickSearch";
import { projectCheckboxItems } from "@/config";
import { sortObjectsByProperty } from "@/utils";

interface Props {
    projects: any;
}

export const ProjectCardList: FC<Props> = ({ projects }) => {

    const [ongoingDisplay, setOngoingDisplay] = useState(true)
    const [ongoingFilterChecked, setOngoingFilterChecked] = useState(true)
    const [ongoingFilterText, setOngoingFilterText] = useState('All')
    const [filteredData, setSearch, clearSearch] = useQuickSearch(projects);
    const [searchValue, setSearchValue] = useState('');
    const [projectCheckbox, setProjectCheckbox] = useState<string>('icon') 
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearch(value);
      setSearchValue(value);
    };

    const handleClearSearch = () => {
        clearSearch();
        setSearchValue('');
      };

    const handleOngoingFilterClick = () => {
        setOngoingDisplay(!ongoingDisplay)
        setOngoingFilterChecked(!ongoingFilterChecked)
        if ( ongoingFilterText === 'Ongoing') {
            setOngoingFilterText('All')
        } else {
            setOngoingFilterText('Ongoing')
        }
    }

    const handleDisplay = (project:any) => {
        if ( project.status !== 'ongoing' ) {
            return ongoingDisplay
        } return true
    }

  return (

    <>
        <Grid
            container
            alignItems='center'
            display="flex"
            direction="column"
        >
            <Grid
                container
                maxWidth={800}
                alignItems="center"
                justifyContent="center"
            >
                <QuickSearch
                    searchValue={searchValue}
                    handleSearchChange={handleSearchChange}
                    handleClearSearch={handleClearSearch}
                    disabled={projectCheckbox==='new'}
                /> 
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignContent: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: 2
                    }}
                >

                    {
                        projectCheckboxItems.map( item => (
                            <ProjectIcon
                                key={item.value}
                                value={item.value}
                                name={item.name}
                                avatar={<item.avatar/>}
                                active={projectCheckbox === item.value}
                                setClicked={() =>setProjectCheckbox(item.value)}
                            />
                        ))
                    }

                    <ProjectSwitch
                        label={ongoingFilterText}
                        checked={ongoingFilterChecked}
                        onChange={handleOngoingFilterClick}
                    />

                    <Divider sx={{ ml:2, mr: 2, height:50 }} orientation="vertical"  />   

                    <FormControlLabel
                        sx={{m:1}}
                        control={<IconButton color="info" aria-label="add to shopping cart"><AddBoxIcon /></IconButton>}
                        label={<Typography sx={{ fontSize: 12 }}> Add new </Typography> }
                        labelPlacement="bottom"
                    />

                </Box>

                <Box
                    width='100%'
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignContent: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: 1
                    }}
                >
                
                    {
                        projectCheckbox === 'icon' 

                        ?
                        sortObjectsByProperty(filteredData, 'idProject').map( project => (                    
                            <ProjectCard
                                key={project.name}
                                project={project}
                                display={handleDisplay(project)}
                            />
                        ))
                        :
                            <ProjectTable
                                projects={filteredData}
                            />
                    }
                </Box>
            </Grid>
        </Grid>
    </>
  )
}
