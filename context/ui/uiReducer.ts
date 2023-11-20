import { IProject } from '@/interfaces';
import { UiState } from './';

type UiActionType =
| { type: '[UI] - ToggleName' }
| { type: '[UI] - Update Active Project', payload: IProject | undefined }

export const uiReducer = ( state:UiState, action: UiActionType): UiState => {

    switch (action.type) {
        case '[UI] - ToggleName':
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen
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