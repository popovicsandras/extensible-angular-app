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
                disabled: true,
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
                title: 'My extensions',
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
                disabled: true,
                url: '/',
                icon: MemoryIcon
            },
            {
                id: 'project-2',
                title: 'Forms',
                type: 'item',
                disabled: true,
                url: '/',
                icon: FormOutlined
            },
            {
                id: 'project-3',
                title: 'Connectors',
                type: 'item',
                disabled: true,
                url: '/',
                icon: ExtensionIcon
            },
            {
                id: 'project-4',
                title: 'Decision tables',
                type: 'item',
                disabled: true,
                url: '/',
                icon: PsychologyIcon
            },
            {
                id: 'project-5',
                title: 'UI Configurations',
                type: 'collapse',
                icon: WebIcon,
                children: [
                  {
                      id: 'retekI',
                      title: 'Kacsa',
                      type: 'item',
                      url: '/ui',
                      icon: WebIcon,
                  }
              ]
            },
            {
                id: 'project-6',
                title: 'Files',
                type: 'item',
                disabled: true,
                url: '/',
                icon: FileOutlined
            },
            {
                id: 'project-7',
                title: 'Scripts',
                type: 'item',
                disabled: true,
                url: '/',
                icon: JavascriptIcon
            },
            {
                id: 'project-8',
                title: 'Triggers',
                type: 'item',
                disabled: true,
                url: '/',
                icon: PlayCircleFilledWhiteIcon
            }
        ]
      }
    ]
};

export default menuItems;
