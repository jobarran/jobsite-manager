
interface ICompanySettings {
    employeeFields: string[],
    employeeRoles: string[];
}

export interface ICompany {
    _id       : string;   
    idCompany : string;
    name      : string;
    createdBy : string;
    settings  : ICompanySettings;
    createdAt?: string;
    updatedAt?: string;
}