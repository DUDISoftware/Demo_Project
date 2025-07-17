const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const User = require("../models/user.model");

const router = express.Router();

// Lấy thông tin tài khoản đang đăng nhập
router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
  res.status(200).json(user);
});

// Chỉ admin mới xem được danh sách người dùng
router.get("/all", authMiddleware, adminMiddleware, async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

module.exports = router;
