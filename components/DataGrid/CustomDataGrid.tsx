import { Grid, Card, CardHeader, Avatar, Box, Divider, useTheme, useMediaQuery } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowsProp, useGridApiRef } from "@mui/x-data-grid";
import { FC, useEffect, useState } from "react";
import { QuickSearch } from "../Project";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { IClient } from "@/interfaces";
import { useRouter } from "next/router";
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';


interface Props {
  data: IClient[],
}

const MOBILE_COLUMNS = {
  idCompany  : true,
  name       : true, 
  lastName   : true,
  email      : true,
  companyName: true,
  phone      : true, 
  address    : true, 
}

const ALL_COLUMNS = {
  idCompany  : true,
  name       : true, 
  lastName   : true,
  email      : true,
  companyName: true,
  phone      : true, 
  address    : true, 
};

 
export const CustomDataGrid:FC<Props> = ({ data }) => {

  const rows: GridRowsProp  = data.map( client => ({
    id         : client.companyName,
    name       : client.name, 
    lastName   : client.lastName,
    email      : client.email,
    companyName: client.companyName,
    phone      : client.phone, 
    address    : client.address, 
  }))

  const apiRef = useGridApiRef();
    const router = useRouter()
    const theme = useTheme()
    const [searchBox, setSearchBox] = useState<any[]>([])
    const [openModal, setOpenModal] = useState(false);
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const [columnVisible, setColumnVisible] = useState(ALL_COLUMNS);
    useEffect(() => {
        const newColumns = matches ? ALL_COLUMNS : MOBILE_COLUMNS;
        setColumnVisible(newColumns);
    }, [matches]);



    useEffect(() => {
        apiRef.current.setQuickFilterValues(searchBox)
      }, [searchBox])
    

    const editUser = 
        (id: GridRowId) => () => {
        router.push(`/client/${id}`)
    }

    const handleSearchInputChange = (input:any) => {
      setSearchBox(input)
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const columns: GridColDef[] = [
      {
          field: 'name',
          headerName: 'Nombre',
          flex: 1,
          minWidth: 170,
          editable: false,
      },
      {
          field: 'lastName',
          headerName: 'Last Name',
          flex: 1,
          minWidth: 60,
          maxWidth: 150,
          editable: false,
      },
      {
          field: 'email',
          headerName: 'Email',
          flex: 1,
          minWidth: 50,
          maxWidth: 200,
          editable: false,
      },
      {
          field: 'companyName',
          headerName: 'Company Name',
          flex: 1,
          minWidth: 50,
          maxWidth: 100,
          editable: false,
      },
      {
          field: 'phone',
          headerName: 'Phone',
          flex: 1,
          minWidth: 50,
          maxWidth: 100,
          editable: false,
          align: 'center'
      },
      {
          field: 'address',
          headerName: 'Address',
          flex: 1,
          minWidth: 50,
          maxWidth: 100,
          editable: false,
          align: 'center'
      },
      {
          field: 'actions',
          headerName: 'Ver',
          type: 'actions',
          flex: 1,
          minWidth: 50,
          maxWidth: 100,
          editable: false,
          getActions: (params: any) => [
              <GridActionsCellItem
                  icon={<OpenInNewOutlinedIcon sx={{ color:theme.palette.primary.main }} />}
                  label="Open"
                  key={params.id}
                  onClick={ editUser(params.id) }
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


