const express = require("express");
const { verifyToken } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/admin.middleware");
const User = require("../models/user.model");

const router = express.Router();

// Lấy thông tin tài khoản đang đăng nhập
router.get("/me", verifyToken, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).json(user);
});

// Chỉ admin mới xem được danh sách người dùng
router.get("/all", verifyToken, isAdmin, async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

module.exports = router;
