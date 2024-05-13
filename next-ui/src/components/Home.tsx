'use client';

import { UserContext } from '@/context/_userContext';
import { AppDispatch, RootState } from '@/redux/store';
import React, { useContext, useEffect } from 'react';
import { ConnectedProps, connect } from 'react-redux';

interface IHomeProps extends PropsFromRedux {}

function Home(props: IHomeProps) {
  const { user } = props;
  
  return (
    <div>
      <h1>Welcome to Home</h1>
      <h2>{user.username}</h2>
    </div>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {};
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Home);
