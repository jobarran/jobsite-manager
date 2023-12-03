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
    editable: boolean
}

export const EmployeeProfileInformationConfig: InfoProps[] = [
    {
        name: "name",
        editable: true
    },
    {
        name: "lastName",
        editable: true
    },
    {
        name: "idNumber",
        editable: false
    },
    {
        name: "status",
        editable: true
    },
    {
        name: "project",
        editable: true
    },
    {
        name: "phone",
        editable: true
    },
    {
        name: "address",
        editable: true
    },
    {
        name: "birth",
        editable: true
    },
    {
        name: "entry",
        editable: true
    },
    {
        name: "field",
        editable: true
    },
    {
        name: "role",
        editable: true
    },
    {
        name: "description",
        editable: true
    },
]