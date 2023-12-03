import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HandshakeIcon from '@mui/icons-material/Handshake';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SettingsIcon from '@mui/icons-material/Settings';

interface Props {
    name: string,
    avatar: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
    url: string,
}

export const EmployeeProfileMenu: Props[] = [
    {
        name: "Information",
        avatar: PermIdentityIcon,
        url: "/",
    },
    {
        name: "Review",
        avatar: StarBorderIcon,
        url: "/",
    },
    {
        name: "Settings",
        avatar: SettingsOutlinedIcon,
        url: "/",
    },
]

interface InfoProps {
    name: string,
    grid: number
}

export const EmployeeProfileInformationConfig: InfoProps[] = [
    {
        name: "name",
        grid: 4
    },
    {
        name: "lastName",
        grid: 4
    },
    {
        name: "idNumber",
        grid: 4
    },
    {
        name: "status",
        grid: 4
    },
    {
        name: "project",
        grid: 4
    },
    {
        name: "phone",
        grid: 4
    },
    {
        name: "address",
        grid: 4
    },
    {
        name: "birth",
        grid: 4
    },
    {
        name: "entry",
        grid: 4
    },
    {
        name: "field",
        grid: 4
    },
    {
        name: "role",
        grid: 4
    },
    {
        name: "description",
        grid: 4
    },
]