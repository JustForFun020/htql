import React from 'react';
import dynamic from 'next/dynamic';
import Loading from '@/components/Loading';

const LoginComponent = dynamic(() => import('../../components/Login'), { loading: () => <Loading /> });

export default function LoginPage() {
  return <LoginComponent />;
}
