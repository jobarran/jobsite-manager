import { ICompany } from '@/interfaces/company';
import { CompanyState } from '.';

type AuthActionType =
| { type: '[Company] - Set Active Company', payload: ICompany }
| { type: '[Company] - Set Out Active Company' }

export const authReducer = ( state:CompanyState, action: AuthActionType): CompanyState => {

    switch (action.type) {
        case '[Company] - Set Active Company':
            return {
                ...state,
                company: action.payload
            }
        case '[Company] - Set Out Active Company':
            return {
                ...state,
                company: undefined
            }

        default:
            return state;
    }
};