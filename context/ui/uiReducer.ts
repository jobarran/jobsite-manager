import { IProject } from '@/interfaces';
import { UiState } from './';

type UiActionType =
| { type: '[UI] - ToggleName' }
| { type: '[UI] - Update Active Project', payload: IProject | undefined }
| { type: '[UI] - ToggleProject'}
| { type: '[UI] - dataMutate'}

export const uiReducer = ( state:UiState, action: UiActionType): UiState => {

    switch (action.type) {
        case '[UI] - ToggleName':
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen
            }
        case '[UI] - ToggleProject':
            return {
                ...state,
                isProjectTable: !state.isProjectTable
            }
        case '[UI] - dataMutate':
            return {
                ...state,
                isDataMutating: !state.isDataMutating
            }
        // case '[UI] - Update Active Project':
        //     return {
        //         ...state,
        //         activeProject: action.payload
        //     }

        default:
            return state;
    }
};