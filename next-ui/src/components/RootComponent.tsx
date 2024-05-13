'use client';

import React, { Suspense } from 'react';
import { Avatar, Divider, Layout } from 'antd';
import MenuComponent from './Menu';
import style from '@/styles/main.module.scss';
import clsx from 'clsx';
import { ShopOutlined, UserOutlined } from '@ant-design/icons';

const { Sider, Header, Content } = Layout;

function RootComponent({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <Layout hasSider className={clsx(style.root__layout)}>
      <Sider collapsed={collapsed} onCollapse={toggleCollapsed} collapsible className={clsx(style.sider)}>
        {!collapsed ? (
          <div className={clsx(style.sider_sub)}>Management System</div>
        ) : (
          <ShopOutlined className={clsx(style.sider_sub)} />
        )}
        <Divider style={{ backgroundColor: '#888888' }} />
        <MenuComponent />
      </Sider>
      <Layout
        className={clsx(style.layout_container)}
        style={collapsed ? { marginLeft: '80px' } : { marginLeft: '200px' }}
      >
        <Header className={clsx(style.header)}>
          <Avatar icon={<UserOutlined />} className={clsx(style.user_icon)} />
        </Header>
        <Content className={clsx(style.content)}>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </Content>
      </Layout>
    </Layout>
  );
}

export default RootComponent;
