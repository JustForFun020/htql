'use client';

import { AppDispatch, RootState } from '@/redux/store';
import { Avatar, Col, Row } from 'antd';
import React from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import style from '@/styles/main.module.scss';
import clsx from 'clsx';
import moment from 'moment';

interface IHomeProps extends PropsFromRedux {}

function Home(props: IHomeProps) {
  const { user } = props;

  return (
    <Row className={clsx(style.home__provider)}>
      <Col span={6} className={clsx(style.primary)}>
        <Avatar size={64} icon={<UserOutlined />} />
        <h3>ID: {user?.id}</h3>
      </Col>
      <Col span={18} className={clsx(style.secondary)}>
        <div className={clsx(style.box)}>
          <h3 className={clsx(style.box__title)}>Base Information</h3>
          <ul className={clsx(style.list__info)}>
            <li>User ID: {user?.id}</li>
            <li>Full Name: {user?.ho_ten}</li>
            <li>Date Of Birth: {moment(user?.ngay_sinh).format('DD/MM/YYYY')}</li>
          </ul>
        </div>
        <div className={clsx(style.box)}>
          <h3 className={clsx(style.box__title)}>Contact Information</h3>
          <ul className={clsx(style.list__info)}>
            <li>Email: {user?.email}</li>
            <li>Phone: {user?.so_dien_thoai}</li>
            <li>Address: {user?.dia_chi}</li>
          </ul>
        </div>
      </Col>
    </Row>
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

export default connector(Home);
