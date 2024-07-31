import React from 'react';
import Header from '../Component/Header';
import Welcome from '../Component/Welcome';
import QuizesList from '../Quiz/QuizesList';
import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <>
      <Header />
      <Welcome />
      <QuizesList />
    </>
  );
}

export default AppLayout;
