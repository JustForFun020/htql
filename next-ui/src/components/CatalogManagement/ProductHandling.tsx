'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import style from '@/styles/main.module.scss';
import clsx from 'clsx';
import { Button, Divider, Space } from 'antd';
import { useRouter } from 'next/navigation';
import Loading from '../Loading';

const ListProduct = dynamic(() => import('../ListProduct'), { loading: () => <Loading />, ssr: false });

function ProductHandling() {
  const router = useRouter();

  return (
    <Space size='middle' direction='vertical' className={clsx(style.product__handling__provider)}>
      <div className={clsx(style.title)}>
        <h3>Product Handling</h3>
        <i>Manage adding, editing, and deleting products here</i>
      </div>
      <Divider />
      <Button onClick={() => router.push('product-handling/add-product')} type='primary'>
        Add Product
      </Button>
      <ListProduct />
    </Space>
  );
}

export default ProductHandling;
