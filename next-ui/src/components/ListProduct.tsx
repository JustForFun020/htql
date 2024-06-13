'use client';

import React, { useEffect } from 'react';
import { Button, Image, Table, TableColumnProps } from 'antd';
import { IProduct } from '@/utils/interface/product';
import { fakeListBook } from '../../__mock__/books';
import { useRouter } from 'next/navigation';
import { useGetAllProductsQuery, useLazyFindProductByIdQuery } from '@/redux/action/productApi';
import Loading from './Loading';
import { ReadOutlined, ReloadOutlined } from '@ant-design/icons';

interface ITableData extends IProduct {}

interface ListProductProps {
  customFooter?: React.ReactNode;
  dataFromProps?: IProduct[];
  className?: any;
}

const ListProduct = ({ customFooter, dataFromProps, className }: ListProductProps) => {
  const { isLoading, data, error, refetch } = useGetAllProductsQuery(undefined, { skip: !!dataFromProps });

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

  if (isLoading) return <Loading />;

  return (
    <Table
      columns={columns}
      dataSource={dataFromProps ? dataFromProps : data ?? []}
      bordered={true}
      className={className}
      title={() => (
        <ul style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 50px' }}>
          <li style={{ fontSize: 40 }}>
            <ReadOutlined size={60} />
          </li>
          <li style={{ fontSize: 30, fontWeight: 600, letterSpacing: '1.4px' }}>List Product</li>
          <li>
            <Button icon={<ReloadOutlined />} type='primary' onClick={refetch}>
              Refresh
            </Button>
          </li>
        </ul>
      )}
      pagination={{ pageSize: 20 }}
      footer={() => customFooter}
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
