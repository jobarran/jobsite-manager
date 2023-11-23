import { FC, useEffect, useReducer } from 'react';
import { UiContext, uiReducer } from './';
import { useRouter } from 'next/router';
import { useProjects } from '@/hooks';
import { IProject } from '../../interfaces/project';


export interface UiState {
    isMenuOpen: boolean;
    activeProject: IProject | undefined,
    isProjectTable: boolean
}

const UI_INITIAL_STATE: UiState = {
    isMenuOpen: false,
    activeProject: undefined,
    isProjectTable: false,
}

interface Props {
    children?: any
}


export const UiProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)
    const { projects } = useProjects('/projects')
    const router = useRouter()

    useEffect(() => {
        const data = sessionStorage.getItem('activeProject');
        if ( data !== null && data !== undefined ) {
            dispatch({ type: '[UI] - Update Active Project', payload: JSON.parse(data)  })
        }
      }, []);
       
    useEffect(() => {
        if ( Object.keys(router.query).length !== 0 ) {
            if ( router.query.idProject ) {
                try {
                    const activeProject = projects.find(project => project.idProject === router.query.idProject)
                    if (activeProject) {
                        sessionStorage.setItem('activeProject', JSON.stringify(activeProject))
                        dispatch({ type: '[UI] - Update Active Project', payload: activeProject  })
                    } 
                } catch (error) {
                    sessionStorage.removeItem('activeProject')
                    dispatch({ type: '[UI] - Update Active Project', payload: undefined  })
                }
            }
        } else {
            sessionStorage.removeItem('activeProject')
            dispatch({ type: '[UI] - Update Active Project', payload: undefined  })
        }
    }, [router.asPath]) 

    const toggleSideMenu = () => {
        dispatch({ type: '[UI] - ToggleName' })
    }

    const toggleProject = () => {
        dispatch({ type: '[UI] - ToggleName' })
    }

    return (
        <UiContext.Provider value={{
            ...state,

            //Metodos
            toggleSideMenu,
            toggleProject
        }}>
            { children }
        </UiContext.Provider>
    )
}