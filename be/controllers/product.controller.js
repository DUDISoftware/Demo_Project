const Product = require("../models/product.model");
const slugify = require("../utils/slug.until");
const { deleteImageFromCloudinary } = require("../middleware/cloudinary.middleware");

exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category_id,
      location,
      label,
      is_heavy,
      contact_phone,
      contact_zalo,
      quality,
      delivery_method,
    } = req.body;

    const slug = slugify(title);
    const user_id = req.user._id;

    const image_url = req.files?.image?.[0]?.path || null;
    const sub_images_urls = req.files?.sub_images?.length > 0
      ? req.files.sub_images.map(file => file.path)
      : [];

    const newProduct = new Product({
      user_id,
      title,
      slug,
      description,
      category_id,
      image_url,
      sub_images_urls,
      location,
      label,
      is_heavy,
      contact_phone,
      contact_zalo,
      quality,
      delivery_method,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: "Tạo sản phẩm thành công", product: savedProduct });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi tạo sản phẩm",
      error: error?.message || error.toString(),
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ created_at: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy danh sách", error: error?.message || error.toString() });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy chi tiết", error: error?.message || error.toString() });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    const {
      title,
      description,
      category_id,
      location,
      label,
      is_heavy,
      contact_phone,
      contact_zalo,
      quality,
      delivery_method,
    } = req.body;

    const slug = slugify(title);

    if (req.files?.image?.[0]?.path && product.image_url) {
      const publicId = getCloudinaryPublicId(product.image_url);
      await deleteImageFromCloudinary(publicId);
    }

    if (req.files?.sub_images && product.sub_images_urls.length > 0) {
      for (let url of product.sub_images_urls) {
        const publicId = getCloudinaryPublicId(url);
        await deleteImageFromCloudinary(publicId);
      }
    }

    const newImageUrl = req.files?.image?.[0]?.path || product.image_url;
    const newSubImagesUrls = req.files?.sub_images?.length > 0
      ? req.files.sub_images.map(file => file.path)
      : product.sub_images_urls;

    product.set({
      title,
      slug,
      description,
      category_id,
      image_url: newImageUrl,
      sub_images_urls: newSubImagesUrls,
      location,
      label,
      is_heavy,
      contact_phone,
      contact_zalo,
      quality,
      delivery_method,
      updated_at: Date.now(),
    });

    const updatedProduct = await product.save();
    res.json({ message: "Cập nhật thành công", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật sản phẩm", error: error?.message || error.toString() });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    if (product.image_url) {
      const publicId = getCloudinaryPublicId(product.image_url);
      await deleteImageFromCloudinary(publicId);
    }

    for (let url of product.sub_images_urls) {
      const publicId = getCloudinaryPublicId(url);
      await deleteImageFromCloudinary(publicId);
    }

    res.json({ message: "Xóa sản phẩm thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xóa sản phẩm", error: error?.message || error.toString() });
  }
};

const getCloudinaryPublicId = (url) => {
  const parts = url.split("/");
  return parts.slice(parts.indexOf("images")).join("/").replace(/\.[^/.]+$/, "");
};
