import { Avatar, Box, Divider, FormControlLabel, Grid, IconButton, Typography } from '@mui/material';
import { ProjectLayout } from "@/components/layouts";
import { useEmployees, useUsers } from '@/hooks';
import { useClients } from '../../hooks/useClients';
import { CustomDataGrid } from '../../components/DataGrid';
import { ClientAddModalNewClient, ClientDataGrid } from '@/components/Client';
import useQuickSearch from '@/hooks/useQuickSearch';
import { FC, useEffect, useState } from 'react';
import { FullScreenLoading, QuickSearch } from '@/components/ui';
import { ProjectIcon } from '../Project';
import AddBoxIcon from '@mui/icons-material/AddBox';

interface Props {
    clients: any;
    mutate: any
}

export const ClientComponents:FC<Props> = ({ clients, mutate }) => {

    const [filteredData, setSearch, clearSearch, setNewData] = useQuickSearch<any>(clients);
    const [searchValue, setSearchValue] = useState('');
    const [isClientMutating, setIsClientMutating] = useState(false) 
    const [openClientModal, setOpenClientModal] = useState(false)
         

    useEffect(() => {
        mutate()
        setNewData(clients)
    }, [isClientMutating]) 

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearch(value);
        setSearchValue(value);
      };
  
    const handleClearSearch = () => {
        clearSearch();
        setSearchValue('');
    };

    const handleOpenNewClientModal = () => {
        setOpenClientModal(true)
    }

    const handleCloseNewClientModal = () => {
        setOpenClientModal(false)
    }



    return (
        <>

            <ClientAddModalNewClient
                openClientModal={openClientModal}
                handleCloseNewClientModal={handleCloseNewClientModal}
                setIsClientMutating={setIsClientMutating}
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
                                control={<IconButton onClick={handleOpenNewClientModal} color="info" aria-label="add to shopping cart"><AddBoxIcon /></IconButton>}
                                label={<Typography sx={{ fontSize: 12 }}> Add new </Typography> }
                                labelPlacement="bottom"
                            />
                    
                            <ClientDataGrid data={filteredData} /> 
                        </Box>
                    </Grid>
                </Grid>
    </>
    )
}
  