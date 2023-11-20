import { FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { CompanyContext, authReducer } from '.';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { ICompany } from '@/interfaces/company';
import { jobSiteManagementApi } from '@/api';
import { AuthContext } from '../auth';
import axios from 'axios';
import { convertToSlug, emailToUser } from '@/utils';
import { useCompany } from '@/hooks';


export interface CompanyState {
    company?: ICompany | undefined
}

const AUTH_INITIAL_STATE: CompanyState = {
    company: undefined,
}


export const CompanyProvider:FC<PropsWithChildren> = ({ children }:any) => {

    const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE )
    const { user } = useContext( AuthContext )

    useEffect(() => {
        if ( user ) {
            setCompany()
        }
      }, [user])

    const setCompany = async() => {
        if (user) {
            const { data } = await jobSiteManagementApi.get<ICompany>(`/company/${user!.idCompany}`);
            dispatch({ type: '[Company] - Set Active Company', payload: data })
        } return
    }

    const unsetCompany = async() => {
        sessionStorage.removeItem('activeCompany')
        dispatch({ type: '[Company] - Set Out Active Company'})
    }

    const registerCompany = async ( companyName: string, email:string ) => {

        try {
            const { data } = await jobSiteManagementApi.post('/company', {
                idCompany: `${emailToUser(email)}-${convertToSlug(companyName)}`,
                name: companyName,
                createdBy: email,
            });
            setCompany()
            return {
                hasError: false,
            }
        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }
            return {
                hasError: true,
                message: 'Cannot create company'
            }
        }

    }


    

    return (
        <CompanyContext.Provider value={{
            ...state,

            // Methods
            setCompany,
            unsetCompany,
            registerCompany
        }}>
            { children }
        </CompanyContext.Provider>
    )
}