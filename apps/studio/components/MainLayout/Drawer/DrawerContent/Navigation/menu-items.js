import {
  DashboardOutlined,
  FormOutlined,
  FileOutlined
} from '@ant-design/icons';

import MemoryIcon from '@mui/icons-material/Memory';
import ExtensionIcon from '@mui/icons-material/Extension';
import WebIcon from '@mui/icons-material/Web';
import PsychologyIcon from '@mui/icons-material/Psychology';
import JavascriptIcon from '@mui/icons-material/Javascript';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';

const menuItems = {
    items: [
      {
        id: 'group-dashboard',
        title: 'Home',
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: 'Dashboard',
                type: 'item',
                url: '/',
                icon: DashboardOutlined,
                breadcrumbs: false
            }
        ]
      },
      {
        id: 'authentication',
        title: 'Extension Marketplace',
        type: 'group',
        children: [
            {
                id: 'login1',
                title: 'Store',
                type: 'item',
                url: '/store',
                icon: LocalGroceryStoreIcon,
            }
        ]
      },
      {
        id: 'utilities',
        title: 'Project',
        type: 'group',
        children: [
            {
                id: 'project-1',
                title: 'Processes',
                type: 'item',
                url: '/',
                icon: MemoryIcon
            },
            {
                id: 'project-2',
                title: 'Forms',
                type: 'item',
                url: '/',
                icon: FormOutlined
            },
            {
                id: 'project-3',
                title: 'Connectors',
                type: 'item',
                url: '/',
                icon: ExtensionIcon
            },
            {
                id: 'project-4',
                title: 'Decision tables',
                type: 'item',
                url: '/',
                icon: PsychologyIcon
            },
            {
                id: 'project-5',
                title: 'Ui Designer',
                type: 'item',
                url: '/ui',
                icon: WebIcon
            },
            {
                id: 'project-6',
                title: 'Files',
                type: 'item',
                url: '/',
                icon: FileOutlined
            },
            {
                id: 'project-7',
                title: 'Scripts',
                type: 'item',
                url: '/',
                icon: JavascriptIcon
            },
            {
                id: 'project-8',
                title: 'Triggers',
                type: 'item',
                url: '/',
                icon: PlayCircleFilledWhiteIcon
            }
        ]
      }
    ]
};

export default menuItems;
