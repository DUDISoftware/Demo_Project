const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
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

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.status(200).json({ token, user });
};
