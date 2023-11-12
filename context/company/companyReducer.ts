import { ICompany } from '@/interfaces/company';
import { CompanyState } from '.';

type AuthActionType =
| { type: '[Company] - Set Active Project', payload: ICompany }
| { type: '[Company] - Set Out Active Project' }

export const authReducer = ( state:CompanyState, action: AuthActionType): CompanyState => {

    switch (action.type) {
        case '[Company] - Set Active Project':
            return {
                ...state,
                company: action.payload
            }
        case '[Company] - Set Out Active Project':
            return {
                ...state,
                company: undefined
            }

        default:
            return state;
    }
};