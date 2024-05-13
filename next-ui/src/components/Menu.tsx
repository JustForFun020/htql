import React from 'react';
import { Menu, Tooltip } from 'antd';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  AreaChartOutlined,
  DeliveredProcedureOutlined,
  ApartmentOutlined,
  BarsOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

const MenuComponent = () => {
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group' | 'item' | 'divider' | undefined,
  ): MenuItem {
    return {
      label,
      key,
      icon,
      children,
      type: type as 'group' | 'divider' | undefined,
    };
  }

  const items: MenuItem[] = [
    getItem(
      <Tooltip title='Home'>
        <Link href='/home'>Home</Link>
      </Tooltip>,
      '/home',
      <HomeOutlined />,
      undefined,
      'item',
    ),
    getItem(
      <Tooltip title='Product catalog management'>
        <Link href='catalog-management'>Catalog management</Link>
      </Tooltip>,
      '/catalog-management',
      <BarsOutlined />,
      undefined,
      'item',
    ),
    getItem(
      <Tooltip title='Sales Management'>
        <Link href='sales-management'>Sales Management</Link>
      </Tooltip>,
      '/sales-management',
      <DeliveredProcedureOutlined />,
      undefined,
      'item',
    ),
    getItem(
      <Tooltip title='Reports'>
        <Link href='report'>Reports</Link>
      </Tooltip>,
      '/report',
      <AreaChartOutlined />,
      undefined,
      'item',
    ),
    getItem(
      <Tooltip title='Warehouse Management'>
        <Link href='warehouse-management'>Warehouse Management</Link>
      </Tooltip>,
      '/warehouse-management',
      <ApartmentOutlined />,
      undefined,
      'item',
    ),
  ];

  const pathName = usePathname() ?? '/home';

  return <Menu items={items} defaultSelectedKeys={['home']} theme='dark' selectedKeys={[pathName]} />;
};

export default MenuComponent;
