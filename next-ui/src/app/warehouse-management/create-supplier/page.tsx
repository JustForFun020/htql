import Loading from '@/components/Loading';
import dynamic from 'next/dynamic';
import React from 'react';

const CreateSupplier = dynamic(() => import('@/components/WarehouseManagement/CreateSupplier'), {
  ssr: false,
  loading: () => <Loading />,
});

function CreateSupplierPage() {
  return <CreateSupplier />;
}

export default CreateSupplierPage;
