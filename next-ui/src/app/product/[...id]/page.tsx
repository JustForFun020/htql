import dynamic from 'next/dynamic';
import React from 'react';

const Product = dynamic(() => import('../../../components/Product'), { loading: () => <p>Loading...</p>, ssr: false });

const ProductPage = ({ params }: { params: { id: string[] } }) => {
  return <Product id={params.id[0]} />;
};

export default ProductPage;
