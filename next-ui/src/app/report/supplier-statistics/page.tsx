import Loading from '@/components/Loading';
import dynamic from 'next/dynamic';
import React from 'react';

const SupplierStatistics = dynamic(() => import('@/components/Report/SupplierStatistics'), {
  loading: () => <Loading />,
  ssr: false,
});

const SupplierStatisticsPage = () => {
  return <SupplierStatistics />;
};

export default SupplierStatisticsPage;
