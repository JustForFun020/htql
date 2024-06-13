'use client';

import React, { use, useContext, useEffect, useState } from 'react';
import { Button, Col, Divider, Form, Input, Row, message } from 'antd';
import style from '@/styles/main.module.scss';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { IUser } from '@/utils/interface/user';
import { UserContext } from '@/context/_userContext';
import { AppDispatch, RootState } from '@/redux/store';
import { setUser } from '@/redux/user/reducer';
import { ConnectedProps, connect } from 'react-redux';
import { useLoginMutation } from '@/redux/action/javaUserApi';
import { useLazyFindUserByEmailQuery } from '@/redux/action/userApi';

type LoginInputProps = {
  email: string;
  mat_khau: string;
};

interface LoginProps extends PropsFromRedux {}

function Login(props: LoginProps) {
  const [userLoginResponse, setUserLoginResponse] = useState<LoginInputProps>({} as LoginInputProps);

  const [login, { isLoading }] = useLoginMutation();
  const [findUserByEmail] = useLazyFindUserByEmailQuery();

  const { saveUser } = props;

  const [form] = Form.useForm();

  const router = useRouter();

  const onFinish = (values: LoginInputProps) => {
    login(values)
      .then((res) => {
        const error = res.error as any;
        if (error) {
          message.error(error.data.message);
        }
        if (res.data) {
          const { token } = res.data;
          localStorage.setItem('token', token);
          findUserByEmail(userLoginResponse.email)
            .unwrap()
            .then((res) => {
              if (res) {
                saveUser(res);
              }
            });
          setTimeout(() => {
            router.push('/home');
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserLoginResponse((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Row justify='center' align='middle' className={clsx(style.form__provider)}>
      <Col className={style.col__form}>
        <div className={clsx(style.form_title)}>Login form</div>
        <Divider />
        <Form form={form} labelAlign='left' labelCol={{ span: 8 }} onFinish={onFinish}>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'Please input a valid email!',
              },
            ]}
          >
            <Input name='email' onChange={onInputChange} />
          </Form.Item>
          <Form.Item
            label='Password'
            name='mat_khau'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password name='mat_khau' onChange={onInputChange} />
          </Form.Item>
          <Form.Item style={{ textAlign: 'center', marginTop: 50 }}>
            <Button htmlType='submit' type='primary' loading={isLoading}>
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
    // user: state.userReducer.user,
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
