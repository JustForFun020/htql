'use client';

import React, { Suspense } from 'react';
import { Avatar, Button, Divider, Dropdown, Layout, MenuItemProps } from 'antd';
import type { MenuProps } from 'antd';
import MenuComponent from './Menu';
import style from '@/styles/main.module.scss';
import clsx from 'clsx';
import { ShopOutlined, UserOutlined } from '@ant-design/icons';
import Loading from './Loading';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@/redux/store';
import { ConnectedProps, connect } from 'react-redux';

const { Sider, Header, Content } = Layout;

interface RootComponentProps extends PropsFromRedux {
  children: React.ReactNode;
}

function RootComponent(props: RootComponentProps) {
  const { children, user } = props;

  const [collapsed, setCollapsed] = React.useState(false);
  const toggleCollapsed = () => setCollapsed(!collapsed);

  const router = useRouter();

  const items: MenuProps['items'] = [
    {
      key: 'email',
      label: <span>Email: {user?.email}</span>,
    },
    {
      key: 'position',
      label: <span>Position: {user?.role_id === '1' ? 'Manager' : 'Cashier'}</span>,
    },
    {
      key: 'logout',
      label: (
        <Button
          onClick={() => {
            localStorage.removeItem('token'), router.push('/');
          }}
          type='primary'
        >
          Logout
        </Button>
      ),
    },
  ];

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
          <Dropdown placement='bottomLeft' trigger={['click']} menu={{ items }}>
            <Avatar icon={<UserOutlined />} className={clsx(style.user_icon)} />
          </Dropdown>
        </Header>
        <Content className={clsx(style.content)}>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </Content>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {};
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(RootComponent);
