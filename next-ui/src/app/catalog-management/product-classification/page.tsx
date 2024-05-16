import Loading from '@/components/Loading';
import dynamic from 'next/dynamic';
import React from 'react';

const ProductClassification = dynamic(() => import('../../../components/CatalogManagement/ProductClassification'), {
  loading: () => <Loading />,
  ssr: false,
});

const ProductClassificationPage = () => {
  return <ProductClassification />;
};

export default ProductClassificationPage;
