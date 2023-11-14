import { IUser } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
     isLoggedIn: boolean;
     user?: IUser;

     loginUser: (email: string, password: string) => Promise<{
          hasError: boolean;
      }>
     registerUser: (name: string, lastName: string, email: string, password: string, companyName: string) => Promise<{
          hasError: boolean;
          message?: string;
      }>
     logout: () => void
}

export const AuthContext = createContext( {} as ContextProps );