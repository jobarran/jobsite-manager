

export interface IUser {
    _id       : string;   
    idCompany : string;
    name      : string;
    lastName  : string;
    idUser    : string;
    email     : string;
    password? : string;
    role      : string;
    possition : string;
    project?  : string;
    createdAt?: string;
    updatedAt?: string;
}