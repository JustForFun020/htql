'use client';

import React, { useEffect } from 'react';
import style from '@/styles/main.module.scss';
import clsx from 'clsx';
import { PowerBIEmbed } from 'powerbi-client-react';
import { Embed, models, Report } from 'powerbi-client';
import { refreshPowerBiDataset } from '@/utils/refreshPowerBiDataset';
import { Button } from 'antd';
import Loading from '../Loading';
import { useRouter } from 'next/navigation';

const ReportOverview = () => {
  const [reportRefreshLoading, setReportRefreshLoading] = React.useState<boolean>(false);

  const reportRef = React.useRef<Report>();
  const router = useRouter();

  const handleGetEmbeddedComponent = (embeddedComponent: Embed) => {
    reportRef.current = embeddedComponent as Report;
  };

  const handleClickRefesh = () => {
    if (reportRef.current) {
      refreshPowerBiDataset(reportRef.current, setReportRefreshLoading);
    }
    setReportRefreshLoading(true);
    setTimeout(() => {
      router.refresh();
      setReportRefreshLoading(false);
    }, 2000);
  };

  const renderReport = () => {
    return (
      <PowerBIEmbed
        embedConfig={{
          type: 'report',
          id: process.env.POWER_BI_REPORT_ID,
          embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${process.env.POWER_BI_REPORT_ID}&config=${process.env.POWER_BI_EMBED_CONFIG}`,
          accessToken: process.env.POWER_BI_ACCESS_TOKEN,
          tokenType: models.TokenType.Aad,
          pageName: 'ReportSection',
          settings: {
            filterPaneEnabled: false,
            navContentPaneEnabled: false,
            background: models.BackgroundType.Transparent,
            layoutType: models.LayoutType.Custom,
            customLayout: {
              displayOption: models.DisplayOption.FitToWidth,
            },
          },
        }}
        eventHandlers={
          new Map([
            [
              'loaded',
              function () {
                return <Loading />;
              },
            ],
            [
              'rendered',
              function () {
                console.log('Report rendered');
              },
            ],
            [
              'error',
              function (event) {
                console.log(event?.detail);
              },
            ],
            ['visualClicked', (val) => console.log(val)],
            ['pageChanged', (event) => console.log(event)],
          ])
        }
        cssClassName={clsx(style.report__iframe)}
        getEmbeddedComponent={handleGetEmbeddedComponent}
      />
    );
  };

  return (
    <div className={clsx(style.report__container)}>
      <div className={clsx(style.report__header)}>
        <h2>Overview Report</h2>
        <Button type='primary' loading={reportRefreshLoading} onClick={handleClickRefesh}>
          Refresh
        </Button>
      </div>
      {renderReport()}
    </div>
  );
};

export default ReportOverview;
