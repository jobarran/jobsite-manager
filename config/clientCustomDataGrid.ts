interface Props {
    column: string,
    allColumns: any,
    mobileColumns: any,
}

export const clientCustomDataGrid: any[] = [
    {
        column: "id",
        allColumns: { idCompany: true },
        mobileColumns: { idCompany: true },
    },
    {
        column: "name",
        allColumns: { name: true },
        mobileColumns: { name: true },
    },
    {
        column: "lastName",
        allColumns: { lastName: true },
        mobileColumns: { lastName: true },
    },
    {
        column: "companyName",
        allColumns: { companyName: true },
        mobileColumns: { companyName: true },
    },
    {
        column: "phone",
        allColumns: { phone: true },
        mobileColumns: { phone: true },
    },
    {
        column: "address",
        allColumns: { address: true },
        mobileColumns: { address: true },
    },
]

export const columnsGrid: any[] = [
    {
        field: 'id',
        headerName: 'ID',
        flex: 1,
        minWidth: 100,
        maxWidth: 150,
    },
    {
        field: 'name',
        headerName: 'Name',
        flex: 1,
        minWidth: 100,
        maxWidth: 150,
    },
    {
        field: 'lastName',
        headerName: 'Last Name',
        flex: 1,
        minWidth: 100,
        maxWidth: 150,
    },
    {
        field: 'companyName',
        headerName: 'Company',
        flex: 1,
        minWidth: 100,
        maxWidth: 150,
    },
    {
        field: 'phone',
        headerName: 'Phone',
        flex: 1,
        minWidth: 100,
        maxWidth: 150,
    },
    {
        field: 'address',
        headerName: 'Address',
        flex: 1,
        minWidth: 100,
        maxWidth: 150,
    },
]