import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './common/Navbar';
import Footer from './common/Footer';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '70px', minHeight: 'calc(100vh - 120px)' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;