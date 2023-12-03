import { Avatar, Box, Divider, FormControlLabel, Grid, IconButton, Typography } from '@mui/material';
import { ProjectLayout } from "@/components/layouts";
import { useEmployees, useUsers } from '@/hooks';
import { EmployeeAddModal, EmployeeUserList, EmployeeWorkersDataGrid } from '@/components/Employee';
import { useClients } from '../../hooks/useClients';
import { CustomDataGrid } from '../DataGrid';
import { ClientAddModalNewClient, ClientDataGrid } from '@/components/Client';
import useQuickSearch from '@/hooks/useQuickSearch';
import { FC, useContext, useEffect, useState } from 'react';
import { FullScreenLoading, QuickSearch } from '@/components/ui';
import { ProjectIcon } from '../Project';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { IUser } from '@/interfaces';
import { UiContext } from '@/context';

interface Props {
    employees: any,
    mutate: any,
    users: IUser[]
}

export const EmployeeComponents:FC<Props> = ({ employees, mutate, users }) => {

    const [filteredData, setSearch, clearSearch, setNewData] = useQuickSearch<any>(employees);
    const [searchValue, setSearchValue] = useState('');
    const [isClientMutating, setIsClientMutating] = useState(false) 
    const [openEmployeeModal, setOpenEmployeeModal] = useState(false)
    const { isDataMutating } = useContext( UiContext )        

    useEffect(() => {
        mutate()
        setNewData(employees)
    }, [isDataMutating]) 

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearch(value);
        setSearchValue(value);
      };
  
    const handleClearSearch = () => {
        clearSearch();
        setSearchValue('');
    };

    const handleOpenNewUserModal = () => {
        setOpenEmployeeModal(true)
    }

    const handleCloseEmployeeModal = () => {
        setOpenEmployeeModal(false)
    }



    return (
        <>

            <EmployeeAddModal
                openEmployeeModal={openEmployeeModal}
                handleCloseEmployeeModal={handleCloseEmployeeModal}
                setIsEmployeeMutating={setIsClientMutating}
            />
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
                    <EmployeeUserList users={users}/>
                    
                    <QuickSearch
                        searchValue={searchValue}
                        handleSearchChange={handleSearchChange}
                        handleClearSearch={handleClearSearch}
                    /> 

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
                        
                        <FormControlLabel
                            sx={{m:1}}
                            control={<IconButton onClick={handleOpenNewUserModal} color="info" aria-label="add to shopping cart"><AddBoxIcon /></IconButton>}
                            label={<Typography sx={{ fontSize: 12 }}> Add new </Typography> }
                            labelPlacement="bottom"
                        />
                        
                        <EmployeeWorkersDataGrid data={filteredData} /> 
                        
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
  