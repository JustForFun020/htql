import Loading from '@/components/Loading';
import dynamic from 'next/dynamic';
import React from 'react';

const AddProduct = dynamic(() => import('@/components/CatalogManagement/AddProduct'), {
  ssr: false,
  loading: () => <Loading />,
});

const AddProductPage = () => {
  return <AddProduct />;
};

export default AddProductPage;
