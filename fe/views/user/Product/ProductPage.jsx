import React, { useState, useEffect } from "react";
import ProductCard from "../Home/components/ProductCard";
import Sidebar from "./Sidebar";
import axios from "axios";

const ProductPage = () => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [distance, setDistance] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const pageSize = 8;

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/category");
      setCategories(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy danh mục:", err);
    }
  };

  const filteredProducts = products.filter((p) => {
    return (
      p.title.toLowerCase().includes(keyword.toLowerCase()) &&
      (category ? p.category_id === category : true) &&
      (region ? p.location.toLowerCase().includes(region.toLowerCase()) : true)
    );
  });

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bg-[#F0F9F1] py-6 lg:px-20">
      <div className="container mx-auto px-4 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-green-700 mb-2">
              Khám phá đồ tặng miễn phí
            </h2>
            <p className="text-sm text-gray-700">
              Tìm kiếm, lọc và chọn món đồ bạn cần từ cộng đồng. Tất cả đều miễn phí, thân thiện và dễ dàng!
            </p>
          </div>
          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-fit">
            Bắt đầu khám phá
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between items-center">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-green-700 mb-2">
              Chào mừng bạn đến với <span className="text-orange-600">Món Quà Cũ</span>
            </h2>
            <p className="text-sm text-gray-700">
              Ủng hộ đồ cũ để người cần có cuộc sống tốt hơn. Cùng nhau lan toả điều tốt đẹp tới xã hội!
            </p>
          </div>
          <img
            src="/images/banner-mongquacu.png"
            alt="Donate Banner"
            className="w-full max-w-[280px] object-contain"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 mb-10">
        <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-4 items-center">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-1 border p-2 rounded w-full sm:w-auto"
            placeholder="Từ khoá, tên đồ, địa chỉ, v.v..."
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Danh mục</option>
            {categories.map((cat) => (

              <option key={cat._id} value={cat._id}>{cat.category_name}</option>
            ))}
          </select>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Khu vực</option>
            <option value="TP.HCM">TP.HCM</option>
            <option value="Hà Nội">Hà Nội</option>
          </select>
          <select
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Khoảng cách</option>
            <option value="5">Dưới 5km</option>
            <option value="10">Dưới 10km</option>
            <option value="20">Dưới 20km</option>
          </select>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Tìm kiếm
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <h2 className="text-xl font-bold mb-6 text-center">
            Tất cả đồ tặng miễn phí
          </h2>

          {currentProducts.length === 0 ? (
            <p className="text-center text-gray-600">Không tìm thấy sản phẩm.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {currentProducts.map((p, i) => (
                <ProductCard key={i} product={p} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2 text-sm flex-wrap">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Trước
              </button>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-3 py-1 border rounded ${currentPage === idx + 1 ? "bg-green-600 text-white" : ""
                    }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Sau
              </button>
            </div>
          )}
        </div>

        <Sidebar />
      </div>
    </div>
  );
};

export default ProductPage;
