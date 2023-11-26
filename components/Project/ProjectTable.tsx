import { Avatar, Box, Card, Grid, IconButton, Rating, Typography, useMediaQuery, useTheme } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams, GridRowId, GridRowsProp, useGridApiRef } from '@mui/x-data-grid';
import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { useRouter } from 'next/router';
import { IEmployee, IProject } from '@/interfaces';
import { DataGridQuickSearch } from '../DataGrid';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonIcon from '@mui/icons-material/Person';

interface Props {
    projects: any,
  }

const MOBILE_COLUMNS = {
    id: true,
    name: true,
    status: true,
    workers: true,
    progress: true,
    leader: true,
    actions: true,
  };
  const ALL_COLUMNS = {
    id: true,
    name: true,
    status: true,
    workers: true,
    progress: true,
    leader: true,
    actions: true,
  };

  
  export const ProjectTable: FC<Props> = ({ projects }) => {
    
    const rows: GridRowsProp  = projects.map( (project:any) => ({
        // key: worker.idNumber,
        id: project.idProject,
        name: project.name,
        status: project.status,
        workers: '7',
        progress: '65%',
        leader: 'JB'
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
    

    const editProject = 
        (id: GridRowId) => () => {
        router.push(`/project/${id}`)
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
            field: 'workers',
            headerName: 'Workers',
            flex: 1,
            minWidth: 70,
            maxWidth: 100,
            editable: false,
        },
        {
            field: 'progress',
            headerName: 'Progress ',
            flex: 1,
            minWidth: 70,
            maxWidth: 200,
            editable: false,
            disableColumnMenu: true,
            hideSortIcons: true
        },
        {
            field: 'leader',
            headerName: 'Leader ',
            flex: 1,
            minWidth: 70,
            maxWidth: 200,
            editable: false,
            disableColumnMenu: true,
            hideSortIcons: true
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
                    onClick={ editProject(params.id) }
                />,
            ],
        },

      ];

  return (

    <Grid item xs={12}>

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


