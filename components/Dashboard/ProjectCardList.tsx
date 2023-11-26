import { FC, useState, useEffect, useContext, ChangeEvent } from "react"
import { Avatar, BottomNavigation, BottomNavigationAction, Box, Button, Checkbox, Divider, FormControlLabel, Grid, IconButton, SvgIcon, Switch, Typography } from "@mui/material"
import { ProjectCard } from "./ProjectCard";
import { NewProject, ProjectTable, QuickSearch } from ".";
import useQuickSearch from "@/hooks/useQuickSearch";
import { UiContext } from "@/context";
import AddBoxIcon from '@mui/icons-material/AddBox';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import TableRowsIcon from '@mui/icons-material/TableRows';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { projectCheckboxItems, projectToggleFilter } from "@/config";
import { AvatarIcon } from '../ui/AvatarIcon';
import { sortObjectsByProperty } from "@/utils";


interface Props {
    projects: any;
}

interface SwitchState {
    [key: string]: boolean;
  }

export const ProjectCardList: FC<Props> = ({ projects }) => {

    const [upcomingDisplay, setUpcomingDisplay] = useState(true)
    const [ongoingDisplay, setOngoingDisplay] = useState(true)
    const [finishedDisplay, setFinishedDisplay] = useState(true)
    const [filteredData, setSearch, clearSearch] = useQuickSearch(projects);
    const [searchValue, setSearchValue] = useState('');
    const [projectCheckbox, setProjectCheckbox] = useState<string>('icon') 
     

    const [switchStates, setSwitchStates] = useState<SwitchState>(
        projectToggleFilter.reduce((acc, { value }) => {
          acc[value] = true;
          return acc;
        }, {} as SwitchState)
      );
    
      const handleSwitchChange = (value: string) => {        
        setSwitchStates((prevStates) => ({
          ...prevStates,
          [value]: !prevStates[value],
        }));
        if ( value === 'upcoming' ) {
            setUpcomingDisplay(!upcomingDisplay)
        } else if ( value === 'ongoing' ) {
            setOngoingDisplay(!ongoingDisplay)
        } else if ( value === 'finished' ) {
            setFinishedDisplay(!finishedDisplay)
        } return
      };
    
  
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearch(value);
      setSearchValue(value);
    };

    const handleClearSearch = () => {
        clearSearch();
        setSearchValue('');
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
            alignItems='center'
            display="flex"
            direction="column"
            // maxWidth={900}
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
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignContent: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >

                    {
                        projectCheckboxItems.map( item => (
                            <FormControlLabel
                                sx={{m:1}}
                                key={item.value}
                                value={item.name}
                                control={
                                    <Checkbox
                                        checked={ projectCheckbox === item.value }
                                        icon={ <item.avatar/> }
                                        checkedIcon={ <item.avatar/> }
                                        onClick={ () =>setProjectCheckbox(item.value)}
                                    />
                                }
                                label={
                                    <Typography sx={{ fontSize: 12 }}>
                                    {item.name}
                                    </Typography>
                                }
                                labelPlacement="bottom"
                            />
                          ))
                    }

                    </Box>

                    <Divider sx={{ ml:2, mr: 2, height:50, display:{xs:'none', sm:'flex'} }} orientation="vertical"  />

                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignContent: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >

                    {
                        projectToggleFilter.map( item => (
                            <FormControlLabel
                                sx={{m:1}}
                                key={item.value}
                                value={item.name}
                                control={
                                    <Switch 
                                        disabled={projectCheckbox==='new'}
                                        size="small"
                                        checked={switchStates[item.value]}
                                        onChange={() => handleSwitchChange(item.value)}
                                        color={item.color}
                                    />
                                }
                                label={
                                    <Typography sx={{ fontSize: 12 }}>
                                    {item.name}
                                    </Typography>
                                }
                                labelPlacement="bottom"
                            />
                          ))
                    }

                </Box>


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
                        : projectCheckbox === 'table'
                            ?
                            <ProjectTable
                                projects={filteredData}
                            />
                            : <NewProject/>
                    }
                </Box>
            </Grid>
        </Grid>
    </>
  )
}
