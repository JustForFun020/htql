'use client';

import _ from 'lodash';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { Button, Divider, Input, Row, Select, Space, Table, message } from 'antd';
import style from '@/styles/main.module.scss';
import clsx from 'clsx';
import { useLazyFindProductByNameQuery } from '@/redux/action/productApi';
import { IProduct } from '@/utils/interface/product';
import { useRouter } from 'next/navigation';
import { useCreateInvoiceMutation } from '@/redux/action/invoiceJavaAction';
import { useLazyFindProductMysqlByNameQuery } from '@/redux/action/mysqlApi';

const CreateInvoice = () => {
  const [productOfSalesInvoice, setProductOfSalesInvoice] = useState<any[]>([]);
  const [selectProductId, setSelectProductId] = useState<number>(0);
  const [isSaveInvoice, setIsSaveInvoice] = useState(false);
  const [amount, setAmount] = useState(1);

  const [findProductByName, { isLoading, data: listProductSearch }] = useLazyFindProductByNameQuery();
  const [createInvoice, { isLoading: createLoading }] = useCreateInvoiceMutation();
  const [findMysqlProduct] = useLazyFindProductMysqlByNameQuery();

  useEffect(() => {
    setIsSaveInvoice(false);
  }, [productOfSalesInvoice]);

  const router = useRouter();

  const handleSearchProduct = (name: string) => {
    setTimeout(() => {
      if (name === '') return;
      findProductByName(name);
    }, 1000);
  };

  const handleCreateInvoice = () => {
    createInvoice({
      listSanPhamDTOS: productOfSalesInvoice,
      ten_hoa_don: 'Hoa Don Ban Hang',
      loai_thanh_toan: 'Tien Mat',
      nguoidung_id: 3,
    })
      .unwrap()
      .then(() => {
        message.success('Create invoice success');
        setProductOfSalesInvoice([]);
        setIsSaveInvoice(true);
      })
      .catch(() => {
        message.error('Create invoice fail');
      });
  };

  const handleClickFooterButton = () => {
    if (_.isEmpty(productOfSalesInvoice)) {
      message.error('Please add product to invoice');
      return;
    }
    if (isSaveInvoice === true) {
      if (_.isEmpty(productOfSalesInvoice)) {
        message.error('Please add product to invoice');
        return;
      }
      router.push('bill-payment');
    } else {
      handleCreateInvoice();
    }
  };

  const handleSelectProduct = async (product: IProduct) => {
    await findMysqlProduct(product.name)
      .unwrap()
      .then((res) => {
        console.log(res);
        setSelectProductId(res[0].id);
      });
    if (_.find(productOfSalesInvoice, (item) => item.name === product.name)) {
      message.error('Product already added to invoice');
      return;
    }
    setProductOfSalesInvoice([
      ...productOfSalesInvoice,
      {
        gia_ban: product.price,
        so_luong: amount,
        ten_san_pham: product.name,
        sanpham_id: selectProductId,
      },
    ]);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'ten_san_pham',
      key: 'ten_san_pham',
    },
    {
      title: 'Amount',
      dataIndex: 'so_luong',
      key: 'so_luong',
      render: (amount: number) => {
        return <Input type='number' value={1} />;
      },
    },
    {
      title: 'Price',
      dataIndex: 'gia_ban',
      key: 'gia_ban',
    },
  ];

  const renderSalesInvoice = () => {
    return (
      <Fragment>
        <div className={clsx(style.enter__text_product)}>
          <span
            style={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Select product name:{' '}
          </span>
        </div>
        <div className={clsx(style.list__product)}>
          <Select
            showSearch
            style={{ width: '40%', margin: '8px 0 25px 0' }}
            onSearch={(value) => handleSearchProduct(value)}
            placeholder='Enter product name to search'
            optionFilterProp='children'
            onSelect={(value) => {
              const product = _.find(listProductSearch, (item) => item.name === value);
              if (product) {
                handleSelectProduct(product);
              }
            }}
          >
            {_.map(listProductSearch, (item) => (
              <Select.Option key={item.key} value={item.name}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <Table
          columns={columns}
          dataSource={productOfSalesInvoice}
          className={clsx(style.table__product)}
          footer={() => (
            <div className={style.table__footer}>
              <p>
                Total Price: ${' '}
                {_.sumBy(productOfSalesInvoice, (item) => {
                  return Number((item.so_luong * item.gia_ban).toFixed(2));
                })}
              </p>
              <Button loading={createLoading} type='primary' onClick={handleClickFooterButton}>
                {!isSaveInvoice ? 'Save Invoice' : 'Pay Invoice'}
              </Button>
            </div>
          )}
        />
      </Fragment>
    );
  };

  return (
    <Space className={clsx([style.create__invoice__provider, style.sales__space])} direction='vertical'>
      <div className={clsx(style.title)}>
        <h3>Create Invoice</h3>
        <i>
          Select products and track your total amount seamlessly. View and manage your product list within the invoice.
          Simplify your invoicing with our intuitive tools.
        </i>
      </div>
      <Divider />
      <Row className={clsx(style.content)}>{renderSalesInvoice()}</Row>
    </Space>
  );
};

export default CreateInvoice;
