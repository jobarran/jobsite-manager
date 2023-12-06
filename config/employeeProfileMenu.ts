import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HandshakeIcon from '@mui/icons-material/Handshake';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import { useProjects } from '@/hooks';
import { useContext } from 'react';
import { UiContext } from '@/context';
import { getAllProjects } from '@/database/dbProjects';

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
    editable: boolean,
    type: string,
    options: string[]
}

export const EmployeeProfileInformationConfig: InfoProps[] = [
    {
        name: "name",
        editable: true,
        type: 'TextField',
        options: []
    },
    {
        name: "lastName",
        editable: true,
        type: 'TextField',
        options: []
    },
    {
        name: "idNumber",
        editable: false,
        type: 'TextField',
        options: []
    },
    {
        name: "status",
        editable: true,
        type: 'Select',
        options: ['active', 'inactive']
    },
    {
        name: "project",
        editable: true,
        type: 'Select',
        options: []
    },
    {
        name: "phone",
        editable: true,
        type: 'TextField',
        options: []
    },
    {
        name: "address",
        editable: true,
        type: 'TextField',
        options: []
    },
    {
        name: "birth",
        editable: true,
        type: 'TextField',
        options: []
    },
    {
        name: "entry",
        editable: true,
        type: 'TextField',
        options: []
    },
    {
        name: "field",
        editable: true,
        type: 'Select',
        options: []
    },
    {
        name: "role",
        editable: true,
        type: 'Select',
        options: []
    },
    {
        name: "description",
        editable: true,
        type: 'TextField',
        options: []
    },
]