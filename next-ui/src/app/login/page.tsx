import React from 'react';
import dynamic from 'next/dynamic';

const LoginComponent = dynamic(() => import('../../components/Login'));

export default function LoginPage() {
  return <LoginComponent />;
}
