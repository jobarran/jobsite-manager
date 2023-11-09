import { dbProjects } from "@/database"
import { IProject } from "@/interfaces"
import { GetServerSideProps, NextPage } from "next"
import { Typography } from '@mui/material';
import { ProjectLayout } from "@/components/layouts";



interface Props {
  project: IProject
}


export const ProjectPage: NextPage<Props> = ({ project }) => {

  return (
    <>
      <ProjectLayout
        title={`${ project.name + ' - ' + project.idProject }`}
        pageDescription={"Admin"}
      >

        <Typography>{ project.name }</Typography>

      </ProjectLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
  const { idProject } = params as { idProject: string }

  const project = await dbProjects.getProjectById( idProject.toString() );

  if ( !project ) {
    return {
      redirect: {
          destination: '/',
          permanent: false
      }
    }
  }

  return {
      props: { 
        project: project
       }
  }
}
  

export default ProjectPage