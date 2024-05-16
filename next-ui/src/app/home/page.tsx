import Loading from '@/components/Loading';
import dynamic from 'next/dynamic';
import React from 'react';

const HomeComponent = dynamic(() => import('../../components/Home'), { loading: () => <Loading /> });

const HomePage = () => {
  return <HomeComponent />;
};

export default HomePage;
