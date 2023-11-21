import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession, signOut, signIn } from 'next-auth/react';
import jobSiteManagementApi from '@/api/jobSiteManagementApi';
import { convertToSlug, emailToUser } from '@/utils';
import { db } from '@/database';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser | undefined
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}


export const AuthProvider:FC<PropsWithChildren> = ({ children }:any) => {

    const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE )
    const { data, status } = useSession();
    const router = useRouter()

    useEffect(() => {
      if ( status === 'authenticated' ) {
        router.push( '/' )
        dispatch({ type: '[Auth] - Login', payload: data?.user as IUser})
      }
    
    }, [ status, data ])
    
    const loginUser = async ( email: string, password: string ) => {

        try {
            const signInRes  = await signIn('credentials', {
                email,
                password,
                redirect: false
            })
            if ( !signInRes?.ok ) {
                return {hasError: true}
            }
            return {hasError: false}
            
        } catch (error) {return {hasError: true}}
        
    }

    const registerUser = async ( name:string, lastName: string, email:string, password:string, companyName: string ): Promise<{hasError: boolean; message?: string}> => {

        try {
            const { data } = await jobSiteManagementApi.post('/users/register', {
                name,
                lastName,
                email,
                password,
                idCompany: `${emailToUser(email)}-${convertToSlug(companyName)}`,
                possition: 'owner',
                role: 'admin'
            });
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
                message: 'Cannot create user'
            }
        }
    }

    const logout = () => {

        Cookies.set('CallbackUrl', 'asd')
        signOut();
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            // loginUser,
            loginUser,
            registerUser,
            logout,
        }}>
            { children }
        </AuthContext.Provider>
    )
}