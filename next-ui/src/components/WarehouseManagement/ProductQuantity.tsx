'use client';

import _ from 'lodash';
import React, { useCallback, useEffect, useRef } from 'react';
import { Divider, Drawer, Input, Modal, Space, Table, TableColumnProps, Tag, message } from 'antd';
import style from '@/styles/main.module.scss';
import clsx from 'clsx';
import { useGetAllCatalogQuery } from '@/redux/action/javaCatalogApi';
import { useLazyGetProductByCatalogQuery, useUpdateProductAmountMutation } from '@/redux/action/productApi';
import { useRouter } from 'next/navigation';

const ProductQuantity = () => {
  const [visibleDrawer, setVisibleDrawer] = React.useState(false);
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [currentCatalog, setCurrentCatalog] = React.useState<any>(null);
  const [currentProduct, setCurrentProduct] = React.useState<any>({});
  const [currentRecord, setCurrentRecord] = React.useState<any>({});
  const [editValueAmount, setEditValueAmount] = React.useState<any>(0);

  const { isLoading, data, refetch: refetchGetAllCatalogQuery } = useGetAllCatalogQuery('');
  const [getProductByCatalog, { isLoading: getProductByCatalogLoading }] = useLazyGetProductByCatalogQuery();
  const [updateProductAmount] = useUpdateProductAmountMutation();

  const catalogCache: any = useRef<any>({}).current;

  const onRowClick = useCallback(
    (record: any) => {
      setVisibleDrawer(true);
      if (catalogCache[record.key]) {
        setCurrentCatalog(catalogCache[record.key]);
        return;
      }
      getProductByCatalog(record.key).then((catalog: any) => {
        catalogCache[record.key] = catalog;
        setCurrentCatalog(catalog);
      });
    },
    [catalogCache, getProductByCatalog],
  );

  const handleUpdateProductAmount = useCallback(() => {
    setVisibleModal(false);
    const updateData = {
      pid: parseInt(currentProduct.id),
      amount: parseInt(editValueAmount),
      did: parseInt(currentProduct.danhmucsp_id),
    };
    updateProductAmount(updateData)
      .unwrap()
      .then(() => {
        message.success('Update product amount successfully');
        refetchGetAllCatalogQuery();
        setVisibleDrawer(false);
        getProductByCatalog(currentRecord.key).then((catalog: any) => {
          catalogCache[currentRecord.key] = catalog;
          setCurrentCatalog(catalog);
        });
      });
  }, [
    currentProduct,
    editValueAmount,
    updateProductAmount,
    refetchGetAllCatalogQuery,
    catalogCache,
    getProductByCatalog,
    currentRecord,
  ]);

  const dataSource = _.map(data, (item, index) => ({
    key: index + 1,
    catalog: item.ten,
    totalQuantity: item.so_luong,
    warehouse: item.khohang_id,
  }));

  const columns: TableColumnProps<any>[] = [
    {
      title: 'Catalog',
      dataIndex: 'catalog',
      key: 'catalog',
      align: 'center',
      render: (text: string) => {
        const catalog =
          text === 'ban_gioi_han' ? 'Limited Product' : text === 'doc_quyen' ? 'Exclusive Product' : 'Normal Product';
        const color = text === 'ban_gioi_han' ? 'red' : text === 'doc_quyen' ? 'green' : 'blue';
        return <Tag color={color}>{catalog}</Tag>;
      },
    },
    {
      title: 'Total Quantity',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
      align: 'center',
    },
    {
      title: 'WareHouse',
      dataIndex: 'warehouse',
      key: 'warehouse',
      align: 'center',
      render: (value) => {
        const warehouse = value === 1 ? 'Ha Noi 1' : value === 2 ? 'Nghe An' : 'Ha Noi 2';
        return <div>{warehouse}</div>;
      },
    },
  ];

  const modalEditProduct = (product: any) => {
    return (
      <Modal
        title={product.ten_san_pham}
        onCancel={() => setVisibleModal(false)}
        open={visibleModal}
        onOk={() => handleUpdateProductAmount()}
        centered
      >
        <div>
          Current Amount: <Input value={editValueAmount} onChange={(e) => setEditValueAmount(e.target.value)} />
        </div>
      </Modal>
    );
  };

  const renderListProductByCatalog = () => {
    return (
      <Drawer
        open={visibleDrawer}
        placement='right'
        width={800}
        onClose={() => setVisibleDrawer(false)}
        title='List Product By Catalog'
        styles={{
          body: {
            padding: '35px',
            overflow: 'hidden',
          },
        }}
      >
        <Space
          direction='vertical'
          size='large'
          className={clsx(style.product__list)}
          classNames={{ item: clsx(style.product__item) }}
        >
          {_.map(currentCatalog?.data ?? [], (item, index) => {
            return (
              <div
                className={clsx(style.card)}
                onClick={() => {
                  setVisibleModal(true);
                  setCurrentProduct(item);
                  setEditValueAmount(item.so_luong);
                }}
              >
                <h3 className={clsx([style.text, style.head])}>{item.ten_san_pham ?? 'No name'}</h3>
                <p className={clsx([style.text])}>Current Amount: {item.so_luong}</p>
              </div>
            );
          })}
        </Space>
      </Drawer>
    );
  };

  return (
    <Space className={clsx(style.warehouse__provider)} direction='vertical'>
      <div className={clsx(style.title)}>
        <h3>Product Quantity</h3>
        <i>
          Gain full control over your inventory quantities with our intuitive platform. Monitor stock levels, adjust
          product quantities as needed, and maintain optimal inventory levels. Streamline your operations and enhance
          efficiency with our powerful quantity management features.
        </i>
      </div>
      <Divider />
      <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              onRowClick(record);
              setCurrentRecord(record);
            },
          };
        }}
        loading={isLoading || getProductByCatalogLoading}
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 10 }}
        title={() => (
          <div className={clsx(style.title)} style={{ fontSize: 26, fontWeight: 600 }}>
            Catalog Information
          </div>
        )}
      />
      {renderListProductByCatalog()}
      {modalEditProduct(currentProduct)}
    </Space>
  );
};

export default ProductQuantity;
