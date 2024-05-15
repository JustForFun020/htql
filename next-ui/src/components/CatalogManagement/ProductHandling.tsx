'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ListProduct = dynamic(() => import('../ListProduct'), { loading: () => <p>Loading...</p>, ssr: false });

function ProductHandling() {
  return (
    <div>
      ProductHandling
      <ListProduct />
    </div>
  );
}

export default ProductHandling;
