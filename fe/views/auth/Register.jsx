import React, { useState, useContext } from "react";
import { registerUser } from "../../src/services/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../src/context/AuthContext";
import MonQuaNhoImg from "../../src/assets/login.png";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    try {
      const res = await registerUser(form);
      const { token, user } = res.data;
      login(user, token);
      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F6F6]">
      <div className="flex w-full max-w-4xl h-[600px] items-stretch bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-1 items-center justify-center px-10 py-12">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-[#43B02A] text-center mb-1">
              Món Quà Nhỏ
            </h1>
            <h2 className="text-lg font-semibold text-[#43B02A] text-center mb-6">
              Đăng ký tài khoản
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="Họ và tên"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#43B02A]"
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#43B02A]"
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="text"
                placeholder="Số điện thoại"
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
              <input
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                type="password"
                placeholder="Nhập lại mật khẩu"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#43B02A]"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-[#43B02A] text-white font-semibold"
              >
                Đăng ký
              </button>

              <div className="flex items-center my-4">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="px-3 text-gray-400 text-sm font-medium">
                  HOẶC
                </span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
              {/* Google/Facebook buttons nếu có */}
            </form>
            <div className="text-center text-sm mt-4">
              Đã có tài khoản?{" "}
              <Link to="/login" className="text-[#43B02A] font-semibold">
                Đăng nhập
              </Link>
            </div>
            <div className="text-center text-sm mt-2">
              <Link to="/" className="text-[#43B02A]">
                Trở về trang chủ
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-1 items-center justify-center bg-[#DDF3E4]">
          <img
            src={MonQuaNhoImg}
            alt="Món Quà Nhỏ"
            className="w-80"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
