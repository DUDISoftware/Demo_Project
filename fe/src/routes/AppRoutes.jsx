import { Routes, Route } from "react-router-dom";
import React from "react";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import AuthLayout from "../layouts/AuthLayout";
import Dashboard from "../../views/admin/Dashboard/Dashboard";
import Login from "../../views/auth/Login";
import Register from "../../views/auth/Register";
import HomePage from "../../views/user/Home/HomePage";
import PrivateRoute from "./PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Public & Protected user pages */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <div>Trang cá nhân</div>
            </PrivateRoute>
          }
        />
      </Route>

      {/* Admin pages (protected layout) */}
      <Route
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route path="/admin" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
