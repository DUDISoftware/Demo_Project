const ProductCategory = require("../models/productCategory.model");
const slugify = require("../utils/slug.until");

// [CREATE] Thêm danh mục mới
exports.createCategory = async (req, res) => {
  try {
    const { category_name, description } = req.body;
    const slug = slugify(category_name);

    const category = new ProductCategory({ category_name, description, slug });
    await category.save();

    res.status(201).json({ message: "Tạo danh mục thành công", category });
  } catch (error) {
    res.status(500).json({ message: "Lỗi tạo danh mục", error: error.message });
  }
};

// [READ ALL] Lấy danh sách danh mục
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await ProductCategory.find().sort({ created_at: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy danh sách", error: error.message });
  }
};

// [READ ONE] Lấy chi tiết danh mục theo ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await ProductCategory.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Không tìm thấy danh mục" });

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy chi tiết", error: error.message });
  }
};

// [UPDATE] Cập nhật danh mục
exports.updateCategory = async (req, res) => {
  try {
    const { category_name, description } = req.body;
    const slug = slugify(category_name);

    const updatedCategory = await ProductCategory.findByIdAndUpdate(
      req.params.id,
      {
        category_name,
        description,
        slug,
        updated_at: Date.now(),
      },
      { new: true }
    );

    if (!updatedCategory) return res.status(404).json({ message: "Không tìm thấy danh mục" });

    res.json({ message: "Cập nhật thành công", updatedCategory });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật", error: error.message });
  }
};

// [DELETE] Xóa danh mục
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await ProductCategory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Không tìm thấy danh mục" });

    res.json({ message: "Xóa danh mục thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xóa danh mục", error: error.message });
  }
};
