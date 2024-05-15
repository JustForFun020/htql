'use client';

import _ from 'lodash';
import React, { useState } from 'react';
import { fakeListBook } from '../../__mock__/books';
import { IProduct } from '@/utils/interface/product';
import style from '@/styles/main.module.scss';
import clsx from 'clsx';
import { Button, Col, Divider, Image, Row, Space, Modal, Drawer, Form, Input } from 'antd';
import Link from 'next/link';

const Product = ({ id }: { id: string }) => {
  const [isOpenModalConfirmDelete, setIsOpenModalConfirmDelete] = useState(false);
  const [isShowEditDrawer, setIsShowEditDrawer] = useState(false);

  const [form] = Form.useForm();

  const product: IProduct = _.filter(fakeListBook, (product: IProduct) => product.key === id)[0];

  const showModalConfirmDelete = () => {
    const handleClickOk = () => {
      console.log('Ok');
    };

    return (
      <Modal
        title='Confirm Delete'
        open={isOpenModalConfirmDelete}
        onOk={handleClickOk}
        onCancel={() => setIsOpenModalConfirmDelete(false)}
        centered
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal>
    );
  };

  const showEditDrawer = () => {
    return (
      <Drawer
        open={isShowEditDrawer}
        onClose={() => setIsShowEditDrawer(false)}
        title={`Edit Product: ${product.name}`}
        placement='right'
        width={646}
        extra={
          <Space>
            <Button type='primary'>Save</Button>
            <Button onClick={() => setIsShowEditDrawer(false)}>Cancel</Button>
          </Space>
        }
      >
        <Form
          form={form}
          initialValues={{ name: product.name, description: product.description, price: product.price }}
          labelAlign='left'
          labelCol={{ span: 6 }}
        >
          <Form.Item name='name' label='Product Name'>
            <Input />
          </Form.Item>
          <Form.Item name='description' label='Product Description'>
            <Input />
          </Form.Item>
          <Form.Item name='price' label='Product Price'>
            <Input />
          </Form.Item>
          <Form.Item required>
            <p>
              ****Note: If you want to edit amount of product, please visit to{' '}
              <Link href='/warehouse-management/product-quantity' style={{ color: '#3B82F6' }}>
                Warehouse Management
              </Link>{' '}
              features
            </p>
          </Form.Item>
        </Form>
      </Drawer>
    );
  };

  return (
    <Row className={clsx(style.product__provider)}>
      <Col className={clsx(style.primary)} span={9}>
        <Image src={product.image} alt='book' width={300} />
      </Col>
      <Col span={2}>
        <Divider type='vertical' className={style.space} />
      </Col>
      <Col className={clsx(style.second)} span={13}>
        <Row className={style.product_info}>
          <Space direction='vertical'>
            <div>
              <span>Name:</span> <p>{product.name}</p>
            </div>
            <div>
              <span>Description:</span> <p>{product.description}</p>
            </div>
            <div>
              <span>Amount:</span> <p>{product.amount}</p>
            </div>
            <div>
              <span>Price:</span> <p>${product.price}</p>
            </div>
            <div>
              <span>CreatedAt:</span> <p>{product.createdAt}</p>
            </div>
          </Space>
        </Row>
        <Divider />
        <Row className={style.product_list_btn}>
          <Col span={4} onClick={() => setIsShowEditDrawer(true)}>
            <Button type='primary'>Edit</Button>
          </Col>
          <Col span={4}>
            <Button type='primary' danger onClick={() => setIsOpenModalConfirmDelete(true)}>
              Delete
            </Button>
          </Col>
        </Row>
      </Col>
      {isOpenModalConfirmDelete && showModalConfirmDelete()}
      {isShowEditDrawer && showEditDrawer()}
    </Row>
  );
};

export default Product;
