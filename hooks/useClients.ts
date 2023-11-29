import { IClient, IEmployee } from '@/interfaces'
import useSWR, { SWRConfiguration } from 'swr'
import useSWRImmutable from 'swr/immutable'

//TODO:: cambiar fetcher por swrconfiguration ver en udemy

const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())

export const useClients = (url: string, config: SWRConfiguration = {} ) => {

    // const { data, error, isLoading } = useSWR<IProduct[]>(`/api${ url }`, fetcher, config)
    const { data, error, mutate, isLoading } = useSWR<IClient[]>(`/api${ url }`, fetcher)

    return {
        clients: data || [],
        error,
        isLoading,
        mutate
    }

}