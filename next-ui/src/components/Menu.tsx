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
      <Tooltip title='Product catalog management'>Catalog management</Tooltip>,
      '/catalog-management',
      <BarsOutlined />,
      [
        getItem(
          <Tooltip title='Product Handling'>
            <Link href='/catalog-management/product-handling'>Product Handling</Link>
          </Tooltip>,
          '/catalog-management/product-handling',
          undefined,
          undefined,
          'item',
        ),
        getItem(
          <Tooltip title='Product Classification'>
            <Link href='/catalog-management/product-classification'>Product Classification</Link>
          </Tooltip>,
          '/catalog-management/product-classification',
          undefined,
          undefined,
          'item',
        ),
      ],
      'item',
    ),
    getItem(
      <Tooltip title='Sales Management'>Sales Management</Tooltip>,
      '/sales-management',
      <DeliveredProcedureOutlined />,
      [
        getItem(
          <Tooltip title='Create Invoice'>
            <Link href='/sales-management/create-invoice'>Create Invoice</Link>
          </Tooltip>,
          '/sales-management/create-invoice',
          undefined,
          undefined,
          'item',
        ),
        getItem(
          <Tooltip title='Bill Payment'>
            <Link href='/sales-management/bill-payment'>Bill Payment</Link>
          </Tooltip>,
          '/sales-management/bill-payment',
          undefined,
          undefined,
          'item',
        ),
      ],
      'item',
    ),
    getItem(
      <Tooltip title='Reports'>Reports</Tooltip>,
      '/report',
      <AreaChartOutlined />,
      [
        getItem(
          <Tooltip title='Overview'>
            <Link href='/report/overview'>Overview</Link>
          </Tooltip>,
          '/report/overview',
          undefined,
          undefined,
          'item',
        ),
        getItem(
          <Tooltip title='Inventory Product'>
            <Link href='/report/inventory-product'>Inventory Product</Link>
          </Tooltip>,
          '/report/inventory-product',
          undefined,
          undefined,
          'item',
        ),
        getItem(
          <Tooltip title='Revenue'>
            <Link href='/report/revenue'>Revenue</Link>
          </Tooltip>,
          '/report/revenue',
          undefined,
          undefined,
          'item',
        ),
        getItem(
          <Tooltip title='Supplier Statistics'>
            <Link href='/report/supplier-statistics'>Supplier Statistics</Link>
          </Tooltip>,
          '/report/supplier-statistics',
          undefined,
          undefined,
          'item',
        ),
      ],
      'item',
    ),
    getItem(
      <Tooltip title='Warehouse Management'>Warehouse Management</Tooltip>,
      '/warehouse-management',
      <ApartmentOutlined />,
      [
        getItem(
          <Tooltip title='Import Goods'>
            <Link href='/warehouse-management/import-goods'>Import Goods</Link>
          </Tooltip>,
          '/warehouse-management/import-goods',
          undefined,
          undefined,
          'item',
        ),
        getItem(
          <Tooltip title='Product Quantity'>
            <Link href='/warehouse-management/product-quantity'>Product Quantity</Link>
          </Tooltip>,
          '/warehouse-management/product-quantity',
          undefined,
          undefined,
          'item',
        ),
      ],
      'item',
    ),
  ];

  const pathName = usePathname() ?? '/home';

  return (
    <Menu
      items={items}
      defaultSelectedKeys={['home']}
      theme='dark'
      selectedKeys={[pathName]}
      triggerSubMenuAction='click'
    />
  );
};

export default MenuComponent;
