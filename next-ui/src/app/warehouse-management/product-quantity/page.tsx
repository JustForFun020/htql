import Loading from '@/components/Loading';
import dynamic from 'next/dynamic';
import React from 'react';

const ProductQuantity = dynamic(() => import('@/components/WarehouseManagement/ProductQuantity'), {
  ssr: false,
  loading: () => <Loading />,
});

const ProductQuantityPage = () => {
  return <ProductQuantity />;
};

export default ProductQuantityPage;
