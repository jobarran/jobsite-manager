

export interface IEmployee {
    name       : string; 
    lastName   : string;
    idNumber   : string;
    state      : string; 
    project    : string; 
    phone?     : string; 
    address?   : string; 
    birth?     : string; 
    entry      : string;
    tags       : string[];
    description: string
}