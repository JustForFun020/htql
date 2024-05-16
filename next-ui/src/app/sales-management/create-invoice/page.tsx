import Loading from '@/components/Loading';
import dynamic from 'next/dynamic';
import React from 'react';

const CreateInvoice = dynamic(() => import('../../../components/SalesManagement/CreateInvoice'), {
  ssr: false,
  loading: () => <Loading />,
});

const CreateInvoicePage = () => {
  return <CreateInvoice />;
};

export default CreateInvoicePage;
