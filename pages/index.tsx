import { Inter } from 'next/font/google'
import { FullScreenLoading } from '@/components/ui'
import { useProjects } from '@/hooks'
import { ProjectCardList } from '@/components/Project'
import { ProjectLayout } from '@/components/layouts'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { projects, isLoading, error } = useProjects('/projects')

  return (
    <>
      <ProjectLayout
        title={"Jobsite Management"}
        pageDescription={"The construction tool"}
      >
      {
        projects && !isLoading
        ? <ProjectCardList projects={ projects } />
        : <FullScreenLoading />
      }

      </ProjectLayout>
    </>
  )
}

