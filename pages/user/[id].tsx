import { dbUsers } from "@/database"
import { IUser } from "@/interfaces"
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next"
import { Typography } from '@mui/material';
import { getSession } from "next-auth/react";
import { ProjectLayout } from '../../components/layouts/ProjectLayout';



interface Props {
    user: IUser
}


export const UserPage: NextPage<Props> = ({ user }) => {

  return (
    <>
      <ProjectLayout
        title={`${ user.name + ' ' + user.lastName + '- Perfil' }`}
        pageDescription={"Editar perfil de usuario"}
      >

        <Typography>{ user.lastName }</Typography>

      </ProjectLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
    
  const { idUser = '' } = query;
  const user = await dbUsers.getUsersByLegajo( idUser.toString() );

  if ( !user ) {
    
      return {
          redirect: {
              destination: '../auth/login',
              permanent: false
          }
      }
  }

  return {
      props: { 
        user: user
       }
  }
}

export default UserPage
