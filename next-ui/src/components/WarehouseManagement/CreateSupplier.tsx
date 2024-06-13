'use client';

import React, { useState } from 'react';
import { Button, Col, Divider, Form, Image, Input, Layout, Row, message } from 'antd';
import clsx from 'clsx';
import style from '@/styles/main.module.scss';
import { useCreateSupplierMutation } from '@/redux/action/supplierApi';
import { useRouter } from 'next/navigation';

const { Content } = Layout;

interface SupplierProps {
  ten_nha_cung_cap: string;
  dia_chi: string;
  so_dien_thoai: string;
  mo_ta: string;
}

const CreateSupplier = () => {
  const [supplier, setSupplier] = useState<SupplierProps>({} as SupplierProps);

  const [form] = Form.useForm();
  const router = useRouter();

  const [createSupplier, { isLoading }] = useCreateSupplierMutation();

  const onFinish = (values: SupplierProps) => {
    setSupplier(values);
    form.resetFields();
    setSupplier({} as SupplierProps);
    createSupplier(values)
      .then(() => {
        message.success('Create supplier successfully');
        setTimeout(() => {
          router.back();
        }, 1800);
      })
      .catch(() => {
        message.error('Create supplier failed');
      });
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  return (
    <Layout className={clsx(style.create__supplier__provider)}>
      <Content className={clsx(style.create__supplier_content)}>
        <Row className={clsx(style.content__primary)} justify='space-between'>
          <Col className={clsx(style.content__primary_title)}>Create Supplier</Col>
          <Col className={clsx(style.content__primary_btn)}>
            <Button onClick={() => router.back()}>Cancel</Button>
          </Col>
        </Row>
        <Row className={clsx(style.content__secondary)}>
          <Col span={12} className={clsx(style.content__secondary_form)}>
            <div className={clsx(style.content_title)}>Base Information</div>
            <Form labelAlign='left' labelCol={{ span: 5 }} form={form} onFinish={onFinish} className={clsx(style.form)}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please input your name!',
                  },
                ]}
                label='Name'
                name='ten_nha_cung_cap'
              >
                <Input name='ten_nha_cung_cap' onChange={onInputChange} />
              </Form.Item>
              <Form.Item
                label='Address'
                rules={[
                  {
                    required: true,
                    message: 'Please input your address!',
                  },
                ]}
                name='dia_chi'
              >
                <Input name='dia_chi' onChange={onInputChange} />
              </Form.Item>
              <Form.Item
                label='Phone'
                name='so_dien_thoai'
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone number!',
                  },
                ]}
              >
                <Input name='so_dien_thoai' onChange={onInputChange} />
              </Form.Item>
              <Form.Item label='Description' name='mo_ta'>
                <Input name='mo_ta' onChange={onInputChange} />
              </Form.Item>
              <Form.Item>
                <Button loading={isLoading} style={{ float: 'right' }} type='primary' htmlType='submit'>
                  Add Supplier
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={1} style={{ textAlign: 'center' }}>
            <Divider type='vertical' style={{ height: '100%' }} />
          </Col>
          <Col span={11} className={clsx(style.content__secondary_preview)}>
            <div className={clsx(style.content_title)}>Preview Information</div>
            <div className={style.preview__info}>
              <Image src='https://jobsgo.vn/blog/wp-content/uploads/2023/01/Vendor-la-gi.jpg' alt='' width={450} />
              <div className={style.supplier_name}>{supplier.ten_nha_cung_cap ?? 'No Information'}</div>
              <ul className={style.supplier_info}>
                <li>{supplier.dia_chi ?? 'No Information'}</li>
                <li>{supplier.so_dien_thoai ?? 'No Information'}</li>
                <li>{supplier.mo_ta ?? 'No Information'}</li>
              </ul>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default CreateSupplier;
