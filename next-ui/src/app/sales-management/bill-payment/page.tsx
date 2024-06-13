import Loading from '@/components/Loading';
import dynamic from 'next/dynamic';
import React from 'react';

const BilPayment = dynamic(() => import('@/components/SalesManagement/BillPayment'), {
  ssr: false,
  loading: () => <Loading />,
});

const BillPaymentPage = () => {
  return <BilPayment />;
};

export default BillPaymentPage;
