import Loading from '@/components/Loading';
import dynamic from 'next/dynamic';
import React from 'react';

const Revenue = dynamic(() => import('@/components/Report/Revenue'), { loading: () => <Loading />, ssr: false });

const RevenuePage = () => {
  return <Revenue />;
};

export default RevenuePage;
