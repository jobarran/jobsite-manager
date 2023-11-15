import { ICompany } from '@/interfaces/company';
import { createContext } from 'react';


interface ContextProps {
     company?: ICompany;

     //Methods
     setCompany: ()=>void,
     unsetCompany: ()=>void,
     registerCompany: ( companyName: string, email: string) => Promise<{ hasError: boolean; message?: undefined; }>

}

export const CompanyContext = createContext( {} as ContextProps );