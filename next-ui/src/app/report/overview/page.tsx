import Loading from '@/components/Loading';
import dynamic from 'next/dynamic';
import React from 'react';

const Overview = dynamic(() => import('../../../components/Report/Overview'), {
  loading: () => <Loading />,
  ssr: false,
});

function ReportOverviewPage() {
  return <Overview />;
}

export default ReportOverviewPage;
