import dynamic from 'next/dynamic';
import React from 'react';

const HomeComponent = dynamic(() => import('../../components/Home'), { loading: () => <p>Loading....</p> });

const HomePage = () => {
  return <HomeComponent />;
};

export default HomePage;
