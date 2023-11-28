import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ChecklistRtlOutlinedIcon from '@mui/icons-material/ChecklistRtlOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HandshakeIcon from '@mui/icons-material/Handshake';

interface Props {
    name: string,
    avatar: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
    url: string,
}

export const sideMenuAdmin: Props[] = [
    {
        name: "Projects",
        avatar: ApartmentOutlinedIcon,
        url: "/",
    },
    {
        name: "Employees",
        avatar: PersonOutlineOutlinedIcon,
        url: "/employee",
    },
    {
        name: "Subcontractors",
        avatar: GroupOutlinedIcon,
        url: "/",
    },
    {
        name: "Clients",
        avatar: HandshakeIcon,
        url: "/client",
    },
    {
        name: "Settings",
        avatar: SettingsOutlinedIcon,
        url: "/",
    },
]

export const sideMenuUser: Props[] = [
    {
        name: "Projects",
        avatar: ApartmentOutlinedIcon,
        url: "/",
    },
    {
        name: "Personal",
        avatar: PersonOutlineOutlinedIcon,
        url: "/",
    },
    {
        name: "Subcontractor",
        avatar: GroupOutlinedIcon,
        url: "/",
    },
    {
        name: "Settings",
        avatar: SettingsOutlinedIcon,
        url: "/",
    },
]

export const sideMenuProject: Props[] = [
    {
        name: "Dashboard",
        avatar: EqualizerOutlinedIcon,
        url: "/",
    },
    {
        name: "Planning",
        avatar: CalendarMonthOutlinedIcon,
        url: "/",
    },
    {
        name: "Docs",
        avatar: FolderOutlinedIcon,
        url: "/",
    },
    {
        name: "Personal",
        avatar: GroupOutlinedIcon,
        url: "/",
    },
    {
        name: "Reports",
        avatar: AssignmentOutlinedIcon,
        url: "/",
    },
    {
        name: "Todo",
        avatar: ChecklistRtlOutlinedIcon,
        url: "/",
    },
    {
        name: "Messages",
        avatar: EmailOutlinedIcon,
        url: "/",
    },
    {
        name: "Settings",
        avatar: SettingsOutlinedIcon,
        url: "/",
    },
    {
        name: "Exit Project",
        avatar: LogoutOutlinedIcon,
        url: "/",
    },
]

export const sideMenuObraCarga: Props[] = [
    {
        name: "Cargar Montaje",
        avatar: AddCircleOutlineOutlinedIcon,
        url: "/montaje",
    },
    {
        name: "Cargar Asistencia",
        avatar: AddCircleOutlineOutlinedIcon,
        url: "/asistencia",
    },
    {
        name: "Cargar Remito",
        avatar: AddCircleOutlineOutlinedIcon,
        url: "/remito",
    },
]