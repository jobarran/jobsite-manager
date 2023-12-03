

export interface IClient {
    _id        : string;
    idCompany  : string;
    name       : string; 
    lastName   : string;
    email      : string;
    companyName: string;
    phone?     : string; 
    address?   : string; 
    description: string
}