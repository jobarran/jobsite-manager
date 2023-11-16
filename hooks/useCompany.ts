import { ICompany } from '@/interfaces/company'
import useSWR, { SWRConfiguration } from 'swr'
import useSWRImmutable from 'swr/immutable'

//TODO:: cambiar fetcher por swrconfiguration ver en udemy

const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json())

export const useCompany = (url: string, config: SWRConfiguration = {} ) => {

    // const { data, error, isLoading } = useSWR<IProduct[]>(`/api${ url }`, fetcher, config)
    const { data, error, isLoading } = useSWR<ICompany[]>(`/api${ url }`, fetcher)

    return {
        company: data || [],
        error,
        isLoading,
    }

}