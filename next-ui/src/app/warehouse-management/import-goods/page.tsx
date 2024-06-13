import Loading from '@/components/Loading';
import dynamic from 'next/dynamic';
import React from 'react';

const ImportGoods = dynamic(() => import('@/components/WarehouseManagement/ImportGoods'), {
  loading: () => <Loading />,
  ssr: false,
});

const ImportGoodsPage = () => {
  return <ImportGoods />;
};

export default ImportGoodsPage;
