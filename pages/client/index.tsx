import { ProjectLayout } from "@/components/layouts";
import { useClients } from '../../hooks/useClients';
import { ClientComponents } from '@/components/Client';
import { FullScreenLoading } from '@/components/ui';


export const ClientPage = () => {

    const { clients, isLoading, mutate } = useClients(`/client`)


    return (
        <>
            <ProjectLayout
                title={"Jobsite Management - Clients"}
                pageDescription={"The construction tool"}
            >
            {
                clients && !isLoading
                ? <ClientComponents
                    clients={clients}
                    mutate={mutate}
                /> 
                : <FullScreenLoading />
            }
      </ProjectLayout>
    </>
    )
}
  

export default ClientPage
