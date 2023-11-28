import { Inter } from 'next/font/google'
import { FullScreenLoading } from '@/components/ui'
import { useProjects } from '@/hooks'
import { ProjectCardList } from '@/components/Project'
import { ProjectLayout } from '@/components/layouts'
import { useEffect, useState } from 'react'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [isProjectMutating, setIsProjectMutating] = useState(false)
  const { projects, isLoading, error, mutate } = useProjects('/project')

  return (
    <>
      <ProjectLayout
        title={"Jobsite Management"}
        pageDescription={"The construction tool"}
      >
      {
        projects && !isLoading
        ? <ProjectCardList
          projects={ projects }
          setIsProjectMutating={setIsProjectMutating}
          mutate={mutate}
          isProjectMutating={isProjectMutating}
        />
        : <FullScreenLoading />
      }

      </ProjectLayout>
    </>
  )
}

