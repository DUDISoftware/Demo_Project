const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // 👈 Tạo biến

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      provider: "local",
      role: "user"
    });

    res.status(201).json({ message: "Đăng ký thành công", userId: newUser._id });
  } catch (error) {
    res.status(400).json({ error: "Email hoặc số điện thoại đã được sử dụng" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "Tài khoản không tồn tại" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Mật khẩu không đúng" });

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(200).json({
    message: "Đăng nhập thành công",
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar: user.avatar,
      provider: user.provider
    }
  });
};

// Đăng nhập / đăng ký bằng Google
exports.googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: "", // Google không cần mật khẩu
        avatar: picture,
        provider: "google",
        isVerified: true,
        role: "user",
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        provider: user.provider,
      },
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Google đăng nhập thất bại" });
  }
};
