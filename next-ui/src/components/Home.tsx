'use client';

import { UserContext } from '@/context/_userContext';
import { AppDispatch, RootState } from '@/redux/store';
import { Avatar, Col, List, Row } from 'antd';
import React, { useContext, useEffect } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { fakeUser } from '../../__mock__/user';
import { UserOutlined } from '@ant-design/icons';
import style from '@/styles/main.module.scss';
import clsx from 'clsx';

interface IHomeProps extends PropsFromRedux {}

function Home(props: IHomeProps) {
  const { user } = props;

  return (
    <Row className={clsx(style.home__provider)}>
      <Col span={8} className={clsx(style.primary)}>
        <Avatar icon={<UserOutlined />} size={64} />
        <div className={clsx(style.username)}>{fakeUser.username}</div>
      </Col>
      <Col span={16} className={clsx(style.second)}>
        <List>
          <List.Item>
            <h3>Full Name:</h3> <span>{fakeUser.fullName} </span>
          </List.Item>
          <List.Item>
            <h3>Date of Bird:</h3> <span>{fakeUser.dateOfBirth}</span>
          </List.Item>
          <List.Item>
            <h3>Email:</h3> <span>{fakeUser.email}</span>
          </List.Item>
          <List.Item>
            <h3>Address:</h3> <span>{fakeUser.address}</span>
          </List.Item>
          <List.Item>
            <h3>Phone Number:</h3> <span>{fakeUser.phoneNumber}</span>
          </List.Item>
          <List.Item>
            <h3>Position:</h3> <span>{fakeUser.role}</span>
          </List.Item>
        </List>
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
