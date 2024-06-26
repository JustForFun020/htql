import type { Metadata } from 'next';
import style from '@/styles/main.module.scss';
import clsx from 'clsx';
import ReduxProvider from '@/redux/ReduxProvider';
import RootComponent from '@/components/RootComponent';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Generated by create next app',
};

export default function CatalogManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <title>MS Book Store: Catalog Management</title>
      </head>
      <body className={clsx(style.body)}>
        <ReduxProvider>
          <RootComponent>{children}</RootComponent>
        </ReduxProvider>
      </body>
    </html>
  );
}
