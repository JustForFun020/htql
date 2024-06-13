import React from 'react';
import style from '@/styles/main.module.scss';
import clsx from 'clsx';

const Loading = () => {
  return <div className={clsx(style.loader)}></div>;
};

export default Loading;
