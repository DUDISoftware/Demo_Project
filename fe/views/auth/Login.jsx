import React, { useState, useContext } from "react";
import { loginUser } from "../../src/services/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../src/context/AuthContext";
import MonQuaNhoImg from "../../src/assets/login.png";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      const { token, user } = res.data;
      login(user, token);
      alert("Đăng nhập thành công!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Lỗi khi đăng nhập");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F6F6]">
      <div className="flex w-full max-w-4xl h-[600px] items-stretch bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-1 items-center justify-center px-10 py-12">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-[#43B02A] text-center mb-1">Món Quà Nhỏ</h1>
            <h2 className="text-lg font-semibold text-[#43B02A] text-center mb-6">Đăng nhập</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#43B02A]"
              />
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                placeholder="Mật khẩu"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#43B02A]"
              />
              <button type="submit" className="w-full py-2 rounded-lg bg-[#43B02A] text-white font-semibold">
                Đăng nhập
              </button>
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-[#1877F3] text-sm hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="flex items-center my-4">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="px-3 text-gray-400 text-sm font-medium">HOẶC</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
              {/* Nút Google / Facebook nếu có */}
            </form>
            <div className="text-center text-sm mt-4">
              Chưa có tài khoản?{" "}
              <Link to="/register" className="text-[#43B02A] font-semibold">
                Đăng ký ngay
              </Link>
            </div>
            <div className="text-center text-sm mt-2">
              <Link to="/" className="text-[#43B02A]">Trở về trang chủ</Link>
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-1 items-center justify-center bg-[#DDF3E4]">
          <img src={MonQuaNhoImg} alt="Món Quà Nhỏ" className="w-80" draggable={false} />
        </div>
      </div>
    </div>
  );
};

export default Login;
