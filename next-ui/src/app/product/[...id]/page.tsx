import Loading from '@/components/Loading';
import dynamic from 'next/dynamic';
import React from 'react';

const Product = dynamic(() => import('../../../components/Product'), { loading: () => <Loading />, ssr: false });

const ProductPage = ({ params }: { params: { id: string[] } }) => {
  return <Product id={params.id[0]} />;
};

export default ProductPage;
