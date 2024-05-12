'use client';

import React from 'react';
import { Button, Col, Divider, Form, Input, Row } from 'antd';
import style from '@/styles/main.module.scss';
import clsx from 'clsx';

type LoginProps = {
  username: string;
  password: string;
};

function Login() {
  const [form] = Form.useForm();

  const onFinish = (values: LoginProps) => {
    console.log(values);
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
            <Input name='username' />
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

export default Login;
