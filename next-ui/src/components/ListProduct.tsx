'use client';

import React from 'react';
import { Image, Table, TableColumnProps } from 'antd';
import { IProduct } from '@/utils/interface/product';
import { fakeListBook } from '../../__mock__/books';
import { useRouter } from 'next/navigation';

interface ITableData extends IProduct {}

const ListProduct = () => {
  const columns: TableColumnProps<ITableData>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => (
        <Image preview={false} src={image} alt='book' style={{ width: '50px' }} width={50} height={50} />
      ),
      align: 'center',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
  ];

  const router = useRouter();

  return (
    <Table
      columns={columns}
      dataSource={fakeListBook}
      bordered={true}
      title={() => <div style={{ textAlign: 'center', fontSize: 24, fontWeight: 600 }}>List Product</div>}
      pagination={{ pageSize: 10 }}
      onRow={(record: IProduct) => {
        return {
          onClick: () => {
            router.push(`/product/${record.key}`);
          },
        };
      }}
    />
  );
};

export default ListProduct;
