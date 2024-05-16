'use client';

import React, { useState } from 'react';
import { Divider, Row, Select, Space } from 'antd';
import style from '@/styles/main.module.scss';
import clsx from 'clsx';

const CreateInvoice = () => {
  const [typeOfInvoice, setTypeOfInvoice] = useState('Sales Invoice');

  const renderSalesInvoice = () => {
    return <div>this is sales invoice</div>;
  };

  const renderImportInvoice = () => {
    return <div>this is import invoice</div>;
  };

  return (
    <Space className={clsx(style.create__invoice__provider)} direction='vertical'>
      <div className={clsx(style.title)}>
        <h3>Create Invoice</h3>
        <i>Store employees create invoices here</i>
      </div>
      <Divider />
      <div>
        <span>Choose type of Invoice: </span>
        <Select defaultValue='Sales Invoice' onSelect={(values) => setTypeOfInvoice(values)}>
          <Select.Option key={1}>Sales Invoice</Select.Option>
          <Select.Option key={2}>Import Invoice</Select.Option>
        </Select>
      </div>
      <Row>{typeOfInvoice === 'Sales Invoice' ? renderSalesInvoice() : renderImportInvoice()}</Row>
    </Space>
  );
};

export default CreateInvoice;
