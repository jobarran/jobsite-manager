import { Inter } from 'next/font/google'
import { FullScreenLoading } from '@/components/ui'
import { useProjects } from '@/hooks'
import { ProjectCardList } from '@/components/Dashboard'
import { ProjectLayout } from '@/components/layouts'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { projects, isLoading } = useProjects('/projects')


  return (
    <>
      <ProjectLayout
        title={"Jobsite Management"}
        pageDescription={"The construction tool"}
      >
      {
        isLoading
        ? <FullScreenLoading />
        : <ProjectCardList projects={ projects } />
      }

      </ProjectLayout>
    </>
  )
}