import React from 'react';
import ProductCard from '../Home/components/ProductCard';
import Sidebar from './Sidebar';

const sampleProducts = new Array(9).fill({
  image: "/images/product.png",
  title: "Áo sơ mi nam",
  location: "Q1, TP.HCM",
});

const ProductPage = () => {
  return (
    <div className="bg-[#F0F9F1] py-6">
      {/* Banner + CTA */}
      <div className="container mx-auto px-4 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold text-green-700 mb-2">
            Khám phá đồ tặng miễn phí
          </h2>
          <p className="text-sm text-gray-700">
            Tìm kiếm, lọc và nhận đồ cũ từ cộng đồng. Tất cả đồ ở đây hoàn toàn miễn phí, chỉ cần bạn thật sự cần.
          </p>
          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Bắt đầu khám phá
          </button>
        </div>
        <img
          src="/images/banner.png"
          alt="banner"
          className="rounded-xl w-full h-full object-cover"
        />
      </div>

      {/* Form tìm kiếm */}
      <div className="container mx-auto px-4 mb-10">
        <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-4 items-center">
          <input
            className="flex-1 border p-2 rounded w-full sm:w-auto"
            placeholder="Từ khoá, tên đồ, địa chỉ, v.v..."
          />
          <select className="border p-2 rounded">
            <option>Danh mục</option>
          </select>
          <select className="border p-2 rounded">
            <option>Khu vực</option>
          </select>
          <select className="border p-2 rounded">
            <option>Khoảng cách</option>
          </select>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Tìm kiếm
          </button>
        </div>
      </div>

      {/* Nội dung chính: Sản phẩm + Sidebar */}
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sản phẩm */}
        <div className="lg:col-span-3">
          <h2 className="text-xl font-bold mb-6 text-center">
            Tất cả đồ tặng miễn phí
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {sampleProducts.map((p, i) => (
              <ProductCard key={i} product={p} />
            ))}
          </div>

          {/* Phân trang */}
          <div className="flex justify-center mt-8 gap-2 text-sm">
            <button className="px-3 py-1 border rounded">Trước</button>
            <button className="px-3 py-1 border bg-green-600 text-white rounded">
              1
            </button>
            <button className="px-3 py-1 border rounded">2</button>
            <button className="px-3 py-1 border rounded">Sau</button>
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
};

export default ProductPage;
