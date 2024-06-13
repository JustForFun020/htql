'use client';

import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import style from '@/styles/main.module.scss';
import clsx from 'clsx';
import { Button, Col, Divider, Image, Row, Space, Modal, Drawer, Form, Input, message, Card } from 'antd';
import Link from 'next/link';
import {
  useDeleteProductByIdMutation,
  useFindProductByIdQuery,
  useUpdateProductByIdMutation,
} from '@/redux/action/productApi';
import Loading from './Loading';
import { useRouter } from 'next/navigation';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Meta } = Card;

const Product = ({ id }: { id: string }) => {
  const [isOpenModalConfirmDelete, setIsOpenModalConfirmDelete] = useState(false);
  const [isOpenEditDrawer, setIsOpenEditDrawer] = useState(false);

  const { isLoading, error, data } = useFindProductByIdQuery(id);
  const [updateProduct, { isLoading: editLoading }] = useUpdateProductByIdMutation();
  const [deleteProduct, { isLoading: deleteLoading }] = useDeleteProductByIdMutation();

  const router = useRouter();

  const [form] = Form.useForm();

  const showModalConfirmDelete = () => {
    const handleClickOk = () => {
      deleteProduct(id)
        .unwrap()
        .then((res) => {
          message.success('Delete product successfully');
          setIsOpenModalConfirmDelete(false);
          setTimeout(() => {
            router.push('/catalog-management/product-handling');
          }, 1300);
        })
        .catch((err) => {
          message.error('Delete product failed');
        });
    };

    return (
      <Modal
        title='Confirm Delete'
        open={isOpenModalConfirmDelete}
        onOk={handleClickOk}
        onCancel={() => setIsOpenModalConfirmDelete(false)}
        centered
        footer={[
          <Button key='back' onClick={() => setIsOpenModalConfirmDelete(false)}>
            Cancel
          </Button>,
          <Button key='submit' type='primary' onClick={handleClickOk} loading={deleteLoading}>
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal>
    );
  };

  const onEditFinish = (values: any) => {
    updateProduct({ id, updateProductDto: values })
      .unwrap()
      .then((res) => {
        message.success('Edit product successfully');
      })
      .catch((err) => {
        message.error('Edit product failed');
        console.log(err);
      });
  };

  const showEditDrawer = () => {
    return (
      <Drawer
        open={isOpenEditDrawer}
        onClose={() => setIsOpenEditDrawer(false)}
        title={`Edit Product: ${data.name}`}
        placement='right'
        width={646}
        extra={
          <Space>
            <Button onClick={() => setIsOpenEditDrawer(false)}>Cancel</Button>
          </Space>
        }
      >
        <Form
          form={form}
          initialValues={{ name: data.name, description: data.description, price: data.price }}
          labelAlign='left'
          labelCol={{ span: 6 }}
          onFinish={onEditFinish}
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
          <Form.Item>
            <Button type='primary' htmlType='submit' loading={editLoading}>
              Save
            </Button>
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

  if (isLoading) return <Loading />;

  return (
    <div className={style.product__provider}>
      <Card
        className={clsx(style.card)}
        cover={<Image src={data.image} height={400} alt='' />}
        actions={[
          <EditOutlined key='edit' onClick={() => setIsOpenEditDrawer(true)} />,
          <DeleteOutlined key='delete' onClick={() => setIsOpenModalConfirmDelete(true)} />,
        ]}
        styles={{
          body: {
            fontSize: '16px',
          },
        }}
      >
        <Meta
          title={<div style={{ fontSize: 28, letterSpacing: 2 }}>{data.name}</div>}
          description={
            <div>
              <p>{data.description}</p>
              <p>Price: ${data.price}</p>
              <p>Amount: {data.amount}</p>
              <p>Created At: {data.createdAt}</p>
            </div>
          }
        />
      </Card>
      {isOpenModalConfirmDelete && showModalConfirmDelete()}
      {isOpenEditDrawer && showEditDrawer()}
    </div>
  );
};

export default Product;
