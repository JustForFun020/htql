import React from 'react';
import { Image } from 'antd';
import style from '@/styles/main.module.scss';
import clsx from 'clsx';

const Welcome = () => {
  return (
    <div className={clsx(style.welcome__provider)}>
      <div className={clsx(style.primary)}>
        <button className={clsx(style.login__btn)}>Login</button>
      </div>
      <div className={clsx(style.second)}>
        <Image
          alt='Welcome'
          src='https://static.vecteezy.com/system/resources/previews/007/943/528/non_2x/business-marketing-strategy-target-management-illustration-free-vector.jpg'
          preview={false}
          style={{ height: '100%' }}
          className={clsx(style.image)}
        />
        <div className={clsx(style.content)}>
          <div className={clsx(style.text)}>
            <h1 key='title'>Management System For Book Store</h1>
            <div key='description'>
              We hope this application will help you in your management work and make accurate business decisions.
            </div>
          </div>
          <button className={clsx([style.login__btn, style.content__btn])}>Get Started!</button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
