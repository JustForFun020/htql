import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import style from '@/styles/main.module.scss';
import clsx from 'clsx';
import { UserContextProvider } from '@/context/context';
import ReduxProvider from '@/redux/ReduxProvider';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={clsx(style.body)}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}