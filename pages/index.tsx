import { Inter } from 'next/font/google'
import { FullScreenLoading } from '@/components/ui'
import { useProjects } from '@/hooks'
import { ProjectCardList } from '@/components/Project'
import { ProjectLayout } from '@/components/layouts'
import { useState } from 'react'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [isMutating, setIsMutating] = useState(false)
  const { projects, isLoading, error, mutate } = useProjects('/projects')

  return (
    <>
      <ProjectLayout
        title={"Jobsite Management"}
        pageDescription={"The construction tool"}
      >
      {
        projects && !isLoading
        ? <ProjectCardList projects={ projects } setIsMutating={setIsMutating} />
        : <FullScreenLoading />
      }

      </ProjectLayout>
    </>
  )
}

