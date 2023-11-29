import { Avatar, Divider, Grid, IconButton, Typography, CardContent, Button, Card, CardHeader, useTheme } from '@mui/material';
import { ProjectLayout } from "@/components/layouts";
import { useUsers } from '@/hooks';
import { GetServerSideProps, NextPage } from 'next';
import { dbEmployee } from '@/database';
import { IEmployee } from '@/interfaces';
import { capitalize, yearDif } from '@/utils';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { CustomBreadCrumbs } from '@/components/ui';
import { useRouter } from 'next/router';

interface Props {
    employee: IEmployee
}

export const EmployeePage:NextPage<Props> = ({employee}) => {

    const theme = useTheme()
    const router = useRouter()

    const breadcrumbsRef = [
        { key: 'employees', name: 'Employees', link: '/employee' },
        { key: 'employee', name: `${employee.name} ${employee.lastName}` , link: undefined },
      ]


    return (
        <>
            <ProjectLayout
            title={"Jobsite Management - Employees"}
            pageDescription={"The construction tool"}
            >

            <CustomBreadCrumbs references={ breadcrumbsRef }/>

            <Grid container spacing={2}>
                <Grid container item spacing={2} xs={12} lg={3}>
                    <Grid item xs={12}>
                        <Card sx={{ boxShadow: 0, height:600}} > 
                        <CardHeader
                            avatar={
                            <Avatar sx={{ bgcolor: theme.palette.primary.main }} aria-label="recipe">
                                {employee.name[0]+employee.lastName[0]}
                            </Avatar>
                            }
                            title={ employee.idNumber }
                            titleTypographyProps={{variant:'h5' }}
                            subheader={`${ employee.name } ${ employee.lastName }`}
                            action={
                            <Button sx={{ color: theme.palette.primary.main, bgcolor: '#ffffff' }
                            }>
                                <EditOutlinedIcon
                                //todo: onClick={}
                                sx={{ m:1 }}
                                />
                            </Button>
                            }
                        />
                        <Divider />
                        <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                            <Typography sx={{ fontSize: 15 }} color="text.secondary">
                                Edad
                            </Typography>
                            <Typography sx={{ mb: 2, fontSize: 18 }} variant="h6">
                                { yearDif(employee.birth || '') }
                            </Typography>
                            </Grid>
                            <Grid item xs={8}>
                            <Typography sx={{ fontSize: 15 }} color="text.secondary">
                                Fecha de nacimiento
                            </Typography>
                            <Typography sx={{ mb: 2, fontSize: 18 }} variant="h6">
                            { employee.birth }
                            </Typography>
                            </Grid>
                            <Grid item xs={4}>
                            <Typography sx={{ fontSize: 15 }} color="text.secondary">
                                Teléfono
                            </Typography>
                            <Typography sx={{ mb: 2, fontSize: 18 }} variant="h6">
                                { employee.phone }
                            </Typography>
                            </Grid>
                            <Grid item xs={8}>
                            <Typography sx={{ fontSize: 15 }} color="text.secondary">
                                Dirección
                            </Typography>
                            <Typography sx={{ mb: 2, fontSize: 18 }} variant="h6">
                            { employee.address }
                            </Typography>
                            </Grid>
                        </Grid>

                        <Divider variant="middle" sx={{ mb: 2 }} />
                        
                        <Typography sx={{ fontSize: 15 }} color="text.secondary">
                            Categoría
                        </Typography>
                        <Typography sx={{ mb: 2, fontSize: 18 }} variant="h6">
                        { employee.status }
                        </Typography>
                        <Typography sx={{ fontSize: 15 }} color="text.secondary">
                            Antiguedad
                        </Typography>
                        <Typography sx={{ mb: 2, fontSize: 18 }} variant="h6">
                            5  años
                        </Typography>
                        <Typography sx={{ fontSize: 15 }} color="text.secondary">
                            Categoría
                        </Typography>
                        <Typography sx={{ mb: 2, fontSize: 18 }} variant="h6">
                            Capataz
                        </Typography>

                        <Typography variant="body1">
                            Educating people with text based content.
                        </Typography>
                        </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Grid container item spacing={2} xs={12} lg={9}>
                    <Grid item xs={12} height='100%'>
                        <Card sx={{ boxShadow: 0, height:600 }}  > 
                        
                        </Card>
                    </Grid>
                </Grid>
            </Grid>

            </ProjectLayout>
    </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {

    const { id = '' } = query;
    const employee = await dbEmployee.getEmployeeById( id.toString() );

    if ( !employee ) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
  
    return {
        props: { 
          employee: employee
         }
    }
  }
  

export default EmployeePage