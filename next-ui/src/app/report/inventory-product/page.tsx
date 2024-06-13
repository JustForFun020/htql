import dynamic from 'next/dynamic';
import React from 'react';

const InventoryProduct = dynamic(() => import('../../../components/Report/InventoryProduct'), { ssr: false });

const InventoryProductPage = () => {
  return <InventoryProduct />;
};

export default InventoryProductPage;
