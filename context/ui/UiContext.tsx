import { IProject } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
     isMenuOpen: boolean;
     activeProject: IProject | undefined
     isProjectTable: boolean

     //Metods
     toggleSideMenu: () => void;
     toggleProject: () => void;
}

export const UiContext = createContext( {} as ContextProps );