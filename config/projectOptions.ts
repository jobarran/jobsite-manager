import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import TableRowsIcon from '@mui/icons-material/TableRows';
import AddBoxIcon from '@mui/icons-material/AddBox';



interface CheckProps {
    name: string,
    avatar: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
    value: string,
}

export const projectCheckboxItems: CheckProps[] = [
    {
        name: "Icons",
        avatar: WorkspacesIcon,
        value: "icon",
    },
    {
        name: "Table",
        avatar: TableRowsIcon,
        value: "table",
    },
    {
        name: "Add new",
        avatar: AddBoxIcon,
        value: "new",

    },
]

interface ToggleProps {
    name: string,
    value: string,
    color: any,    
}

export const projectToggleFilter: ToggleProps[] = [
    {
        name: "Upcoming",
        value: "upcoming",
        color: 'warning',
    },
    {
        name: "Ongoing",
        value: "ongoing",
        color: 'primary'
    },
    {
        name: "Finished",
        value: "finished",
        color: 'secondary'
    },
]