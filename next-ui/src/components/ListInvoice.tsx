'use client';

import moment from 'moment';
import React, { useEffect } from 'react';
import { Table, TableColumnProps, Tag } from 'antd';
// import  type {TableColumnProps}  from 'antd';
import { IInvoice } from '@/utils/interface/invoice';
import style from '@/styles/main.module.scss';
import clsx from 'clsx';
import { fakeListInvoice } from '../../__mock__/listInvoice';
import { useGetAllInvoicesQuery, useUpdateInvoiceStatusMutation } from '@/redux/action/invoiceApi';

interface ITableData extends IInvoice {}

const ListInvoice = () => {
  const { data, isLoading } = useGetAllInvoicesQuery(undefined);
  const [updateStatus] = useUpdateInvoiceStatusMutation();

  const columns: TableColumnProps<ITableData>[] = [
    {
      title: 'Invoice ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Type Payment',
      dataIndex: 'loai_thanh_toan',
      key: 'loai_thanh_toan',
    },
    {
      title: 'Status',
      dataIndex: 'trang_thai',
      key: 'trang_thai',
      render: (values: any) => {
        const status = values.data[0] === 1 ? 'Paid' : 'Unpaid';
        return <Tag color={values.data[0] === 1 ? 'Green' : 'Red'}>{status}</Tag>;
      },
    },
    {
      title: 'Created At',
      dataIndex: 'ngay_tao',
      key: 'ngay_tao',
      render: (values: string) => {
        return moment(values).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Total Price',
      dataIndex: 'tong_tien',
      key: 'tong_tien',
      render: (values: number) => {
        return values.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      },
    },
    {
      title: 'Type',
      dataIndex: 'ten_hoa_don',
      key: 'ten_hoa_don',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      className={clsx(style.list__invoice__provider)}
      title={() => <div className={clsx(style.title)}>List Invoice</div>}
      pagination={{ pageSize: 20 }}
      loading={isLoading}
      onRow={(record: any) => {
        return {
          onClick: () => {
            const status = record.trang_thai.data[0] === 1 ? 0 : 1;
            updateStatus({ id: record.id, status });
          },
        };
      }}
    />
  );
};

export default ListInvoice;
