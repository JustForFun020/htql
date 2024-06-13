'use client';

import { useFindInvoiceByIdQuery, useGetAllInvoicesQuery } from '@/redux/action/invoiceApi';
import { Divider, Row, Space } from 'antd';
import clsx from 'clsx';
import React from 'react';
import style from '@/styles/main.module.scss';
import ListInvoice from '../ListInvoice';

interface BillPaymentProps {
  id?: number;
}

const BillPayment = ({ id }: BillPaymentProps) => {
  const {} = useGetAllInvoicesQuery(undefined, { skip: !!id });

  const {} = useFindInvoiceByIdQuery(id as number, { skip: !id });

  return (
    <Space className={clsx([style.bill__payment__provider, style.sales__space])} direction='vertical'>
      <div className={clsx(style.title)}>
        <h3>Bill Payment</h3>
        <i>
          Manage and pay all your bills in one place. Select the bills you want to settle and proceed with secure
          payment options. Experience the convenience of online bill management.
        </i>
      </div>
      <Divider />
      <ListInvoice />
    </Space>
  );
};

export default BillPayment;
