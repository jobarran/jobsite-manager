import { IProject } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
     isMenuOpen: boolean;
     activeProject: IProject | undefined

     //Metods
     toggleSideMenu: () => void;
}

export const UiContext = createContext( {} as ContextProps );