import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet /> {/* nội dung từng route như HomePage sẽ được hiển thị ở đây */}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
