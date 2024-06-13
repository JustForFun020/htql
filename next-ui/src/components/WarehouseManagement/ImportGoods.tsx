'use client';

import _ from 'lodash';
import moment from 'moment';
import React, { useState } from 'react';
import { Button, Col, Divider, Form, Input, Row, Space, message } from 'antd';
import style from '@/styles/main.module.scss';
import clsx from 'clsx';
import ListProduct from '../ListProduct';
import { IProduct } from '@/utils/interface/product';
import { useImportProductMutation } from '@/redux/action/warehouseApi';
import { useCreateReceiptMutation } from '@/redux/action/javaWarehouseApi';
import { useRouter } from 'next/navigation';

const ImportGoods = () => {
  const [listImportGoods, setListImportGoods] = useState<IProduct[]>([]);
  const [supplierName, setSupplierName] = useState<string>('');

  const [form] = Form.useForm();

  const router = useRouter();

  const [importProduct] = useImportProductMutation();
  const [createReceipt, { isLoading: isCreateReceiptLoading }] = useCreateReceiptMutation();

  const handleClickConfirm = () => {
    if (_.isEmpty(supplierName)) {
      message.error('Please input supplier name');
      return;
    }
    createReceipt({
      ten_san_pham: listImportGoods[0].name,
      so_luong: parseInt((listImportGoods[0] as any).amount),
      gia_nhap: parseFloat((listImportGoods[0] as any).price),
      nhacungcap_id: 1,
      nguoidung_id: 1,
    });
    setListImportGoods([]);
  };

  const onFinish = (values: IProduct) => {
    const { amount, price, name } = values;
    setListImportGoods([...listImportGoods, { ...values, createdAt: moment().format('DD/MM/YYYY') }]);
    form.resetFields();
    importProduct({
      productName: name,
      amount,
      price,
    });
  };

  return (
    <Space className={clsx(style.warehouse__provider)} direction='vertical'>
      <div className={clsx(style.title)}>
        <h3>Import Goods</h3>
        <i>
          Seamlessly import products from suppliers. Simplify your inventory management with our efficient import tools
          and keep your stock updated.
        </i>
      </div>
      <Divider />
      <Row>
        <Col span={14} style={{ border: '1px solid #ccc', padding: '30px', borderRadius: '10px' }}>
          <Form form={form} labelAlign='left' labelCol={{ span: 6 }} onFinish={onFinish}>
            <Form.Item
              name='name'
              label='Product Name'
              rules={[
                {
                  required: true,
                  message: 'Please input product name',
                },
              ]}
            >
              <Input placeholder='Product Name' name='productName' />
            </Form.Item>
            <Form.Item
              name='amount'
              label='Amount'
              rules={[
                {
                  required: true,
                  message: 'Please input amount',
                },
              ]}
            >
              <Input placeholder='Amount' name='amount' />
            </Form.Item>
            <Form.Item
              name='price'
              label='Price Per Product'
              rules={[
                {
                  required: true,
                  message: 'Please input price per product',
                },
              ]}
            >
              <Input placeholder='Price Per Product' name='price' />
            </Form.Item>
            <Form.Item label='Description' name='description'>
              <Input.TextArea placeholder='Description' name='description' style={{ resize: 'none', height: 100 }} />
            </Form.Item>
            <Form.Item label='Link Image' name='image'>
              <Input name='image' />
            </Form.Item>
            <Form.Item name='add'>
              <Button style={{ float: 'right' }} htmlType='submit' type='primary'>
                Add
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={2}></Col>
        <Col span={8} style={{ border: '1px solid #ccc', padding: '30px', borderRadius: '10px' }}>
          <div>
            <span>
              <span style={{ color: 'red' }}>*</span> Supplier Name:
            </span>
            <Input.Search
              placeholder='Supplier Name'
              onChange={(e) => setSupplierName(e.target.value)}
              value={supplierName}
              style={{ marginTop: 10 }}
            />
          </div>
          <Button
            style={{ float: 'right', marginTop: 20 }}
            onClick={() => router.push('/warehouse-management/create-supplier')}
          >
            New Supplier
          </Button>
        </Col>
      </Row>
      <ListProduct
        dataFromProps={listImportGoods}
        customFooter={
          <div style={{ textAlign: 'end' }}>
            <Button
              type='primary'
              disabled={_.isEmpty(listImportGoods) ? true : false}
              onClick={handleClickConfirm}
              loading={isCreateReceiptLoading}
            >
              Confirm
            </Button>
          </div>
        }
      />
    </Space>
  );
};

export default ImportGoods;
