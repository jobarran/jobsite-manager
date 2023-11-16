import { Avatar, Box, Card, Grid, IconButton, Rating, Typography, useMediaQuery, useTheme } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams, GridRowId, GridRowsProp, useGridApiRef } from '@mui/x-data-grid';
import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { useRouter } from 'next/router';
import { IEmployee } from '@/interfaces';
import { DataGridQuickSearch } from '../DataGrid';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonIcon from '@mui/icons-material/Person';

interface Props {
    data: IEmployee[],
}

const MOBILE_COLUMNS = {
    id: true,
    name: true,
    status: false,
    project: true,
    field: true,
    role: true,
    attendance: false,
    score: false,
    actions: true,
  };
  const ALL_COLUMNS = {
    id: true,
    name: true,
    status: true,
    project: true,
    field: true,
    role: true,
    attendance: true,
    score: true,
    actions: true,
  };
 
export const EmployeeWorkersTable:FC<Props> = ({ data }) => {
    
    const rows: GridRowsProp  = data.map( worker => ({
        // key: worker.idNumber,
        id: worker.idNumber,
        name: worker.lastName + ' ' + worker.name,
        status: worker.status,
        project: worker.project,
        field: worker.field,
        role: worker.role,
        attendance: '30%',
        score: 4,
    }))

    const apiRef = useGridApiRef();
    const router = useRouter()
    const theme = useTheme()
    const [searchBox, setSearchBox] = useState<any[]>([])
    const [openModal, setOpenModal] = React.useState(false);
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [columnVisible, setColumnVisible] = React.useState(ALL_COLUMNS);

    useEffect(() => {
        const newColumns = matches ? ALL_COLUMNS : MOBILE_COLUMNS;
        setColumnVisible(newColumns);
    }, [matches]);



    useEffect(() => {
        apiRef.current.setQuickFilterValues(searchBox)
      }, [searchBox])
    

    const editUser = 
        (id: GridRowId) => () => {
        router.push(`/employee/${id}`)
    }
    

    const columns: GridColDef[] = [
        { 
            field: 'id',
            headerName: 'ID',
            flex: 1,
            minWidth: 100,
            maxWidth: 150,
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            minWidth: 170,
            editable: false,
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            minWidth: 70,
            maxWidth: 100,
            editable: false,
        },
        {
            field: 'project',
            headerName: 'Project',
            flex: 1,
            minWidth: 70,
            maxWidth: 100,
            editable: false,
        },
        {
            field: 'field',
            headerName: 'Field ',
            flex: 1,
            minWidth: 70,
            maxWidth: 200,
            editable: false,
            disableColumnMenu: true,
            hideSortIcons: true
        },
        {
            field: 'role',
            headerName: 'Role ',
            flex: 1,
            minWidth: 70,
            maxWidth: 200,
            editable: false,
            disableColumnMenu: true,
            hideSortIcons: true
        },
        {
            field: 'attendance',
            headerName: 'Attendance',
            flex: 1,
            minWidth: 70,
            maxWidth: 100,
            editable: false,
            disableColumnMenu: true,
            hideSortIcons: true
        },
        {
            field: 'score',
            headerName: 'Score',
            flex: 1,
            minWidth: 70,
            maxWidth: 100,
            editable: false,
            disableColumnMenu: true,
            hideSortIcons: true,
            renderCell: (params: GridRenderCellParams) => (
                <Rating
                    name="half-rating-read"
                    defaultValue={params.value}
                    precision={0.5}
                    readOnly 
                    size="small"
                />
              )     
        },
        {
            field: 'actions',
            headerName: 'Open',
            type: 'actions',
            flex: 1,
            minWidth: 70,
            maxWidth: 100,
            editable: false,
            getActions: (params: any) => [
                <GridActionsCellItem
                    icon={<OpenInNewOutlinedIcon sx={{ color:theme.palette.info.main }} />}
                    label="Open"
                    key={params.id}
                    onClick={ editUser(params.id) }
                />,
            ],
        },

      ];

    const handleSearchInputChange = (input:any) => {
        setSearchBox(input)
      }

    const handleOpenModal = () => {
        setOpenModal(true);
    };

  return (

    <Grid item xs={12}>

        <Grid container>


            <Grid item xs={2}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Avatar>
                        <PersonIcon />
                    </Avatar>
                    <Typography
                        sx={{mt:1, ml:1}}
                        variant='body1'
                    >
                        Workers
                    </Typography>   
                </Box>   
            </Grid>

            <Grid item flex={1}>
            </Grid>


            <Grid item xs={1} >
                <Box display="flex" justifyContent="flex-end">
                    <IconButton
                        sx={{
                            mt:0.5,
                            color: theme.palette.info.main
                        }}
                        onClick={handleOpenModal}
                    >
                        <PersonAddAlt1Icon />
                    </IconButton>
                </Box>
            </Grid>

            <Grid item xs={5} md={4} lg={3}>
                <Box display="flex" justifyContent="flex-end">
                    <DataGridQuickSearch
                        data={ searchBox }
                        handleSearchInputChange={ handleSearchInputChange }
                        handleDataReset={ setSearchBox }
                    />
                </Box>
            </Grid>

        </Grid>
            

        <Card sx={{ boxShadow: 0, mt:2}}>

            
            
            <div style={{ width: '100%' }}>
                <DataGrid
                    apiRef={apiRef}
                    rows={rows}
                    columns={columns}
                    columnVisibilityModel={columnVisible}
                    rowHeight={35}
                    hideFooterSelectedRowCount
                    autoHeight={true}
                    disableRowSelectionOnClick
                    slotProps={{
                        toolbar: {
                        showQuickFilter: true,
                        },
                    }}
                    initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                    sorting: {
                        sortModel: [{ field: 'name', sort: 'asc' }],
                    },
    
                    }}
                    pageSizeOptions={[10]}
                    sx={{
                        border: 0,
                        bgcolor: '#f7f9fa'
                    }}
                />
            </div>
        </Card>
    </Grid>

  );
}


