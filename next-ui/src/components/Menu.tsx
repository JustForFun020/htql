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
    getItem(<Tooltip title='Home'>Home</Tooltip>, 'home', <HomeOutlined />, undefined, 'item'),
    getItem(
      <Tooltip title='Product catalog management'>Catalog management</Tooltip>,
      'catalog',
      <BarsOutlined />,
      undefined,
      'item',
    ),
    getItem(
      <Tooltip title='Sales Manager'>Sales Manager</Tooltip>,
      'sales',
      <DeliveredProcedureOutlined />,
      undefined,
      'item',
    ),
    getItem(<Tooltip title='Reports'>Reports</Tooltip>, 'reports', <AreaChartOutlined />, undefined, 'item'),
    getItem(
      <Tooltip title='Warehouse Management'>Warehouse Management</Tooltip>,
      'warehouse',
      <ApartmentOutlined />,
      undefined,
      'item',
    ),
  ];

  return <Menu items={items} defaultSelectedKeys={['home']} theme='dark' />;
};

export default MenuComponent;
