import { DashboardOutlined, AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';

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
                icon: AppstoreOutlined,
            }
        ]
      },
      {
        id: 'utilities',
        title: 'Applications',
        type: 'group',
        children: [
            {
                id: 'util-typography',
                title: 'List of Applications',
                type: 'item',
                url: '/applications',
                icon: UnorderedListOutlined
            }
        ]
      }
    ]
};

export default menuItems;
