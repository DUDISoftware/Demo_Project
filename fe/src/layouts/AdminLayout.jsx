import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-600 text-white p-4 font-bold text-xl">
        Quản trị hệ thống
      </header>
      <main className="p-6">
        <Outlet /> {/* nơi hiển thị Dashboard hoặc các trang Admin khác */}
      </main>
    </div>
  );
};

export default AdminLayout;
