'use client';

import React, { use, useContext, useEffect, useState } from 'react';
import { Button, Col, Divider, Form, Input, Row } from 'antd';
import style from '@/styles/main.module.scss';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { IUser } from '@/utils/interface';
import { UserContext } from '@/context/_userContext';
import { AppDispatch, RootState } from '@/redux/store';
import { setUser } from '@/redux/user/reducer';
import { ConnectedProps, connect } from 'react-redux';

type LoginInputProps = {
  username: string;
  password: string;
};

interface LoginProps extends PropsFromRedux {}

function Login(props: LoginProps) {
  const [user, setUser] = useState<IUser>({} as IUser);

  const { saveUser } = props;

  const [form] = Form.useForm();

  const router = useRouter();

  const onFinish = (values: LoginInputProps) => {
    saveUser(user);
    router.push('/home');
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Row justify='center' align='middle' className={clsx(style.form__provider)}>
      <Col className={style.col__form}>
        <div className={clsx(style.form_title)}>Login form</div>
        <Divider />
        <Form form={form} labelAlign='left' labelCol={{ span: 8 }} onFinish={onFinish}>
          <Form.Item
            label='Username'
            name='username'
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input name='username' onChange={onInputChange} />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password name='password' />
          </Form.Item>
          <Form.Item style={{ textAlign: 'center', marginTop: 50 }}>
            <Button htmlType='submit' type='primary'>
              Login
            </Button>
          </Form.Item>
        </Form>
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
  return {
    saveUser: (user: IUser) => dispatch(setUser(user)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Login);
