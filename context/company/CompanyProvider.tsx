import { FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { CompanyContext, authReducer } from '.';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { ICompany } from '@/interfaces/company';
import { useCompany } from '@/hooks';
import { jobSiteManagementApi } from '@/api';
import { AuthContext } from '../auth';


export interface CompanyState {
    company?: ICompany | undefined
}

const AUTH_INITIAL_STATE: CompanyState = {
    company: undefined,
}


export const CompanyProvider:FC<PropsWithChildren> = ({ children }:any) => {

    const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE )
    const { user } = useContext( AuthContext )
    const router = useRouter()

    const setCompany = async() => {
            const { data } = await jobSiteManagementApi.get<ICompany>(`/company/${user!.idCompany}`);
            dispatch({ type: '[Company] - Set Active Project', payload: data })
    }

    const unsetCompany = async() => {
        dispatch({ type: '[Company] - Set Out Active Project'})
    }

    useEffect(() => {
        if ( user ) {
            setCompany()
        }
      }, [user])

    

    return (
        <CompanyContext.Provider value={{
            ...state,

            // Methods
            setCompany,
            unsetCompany
        }}>
            { children }
        </CompanyContext.Provider>
    )
}