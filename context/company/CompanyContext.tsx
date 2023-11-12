import { ICompany } from '@/interfaces/company';
import { createContext } from 'react';


interface ContextProps {
     company?: ICompany;

     //Methods
     setCompany: ()=>void,
     unsetCompany: ()=>void

}

export const CompanyContext = createContext( {} as ContextProps );