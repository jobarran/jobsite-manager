import { IProject } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
     isMenuOpen: boolean;
     activeProject: IProject | undefined
     isProjectTable: boolean
     isDataMutating: boolean

     //Metods
     toggleSideMenu: () => void;
     toggleProject: () => void;
     toggleDataMutating: () => void;
}

export const UiContext = createContext( {} as ContextProps );