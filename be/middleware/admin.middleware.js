const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Chỉ admin được phép truy cập" });
  }
  next();
};

module.exports = { isAdmin };
