import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md transition p-8 flex flex-col justify-between text-center relative">
      {/* Badge top left - Label */}
      {product.label && (
        <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded bg-blue-600 text-white">
          {product.label}
        </span>
      )}

      {/* Badge top right - Tình trạng hoặc hot */}
      {product.is_hot && (
        <span className="absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded bg-yellow-400 text-white">
          Hot
        </span>
      )}

      {/* Ảnh sản phẩm */}
      <img
        src={product.image_url || "/images/placeholder.png"}
        alt={product.title}
        className="mx-auto h-36 object-contain mb-4"
      />

      {/* Thông tin sản phẩm */}
      <div className="flex-1">
        <h3 className="font-semibold text-sm">{product.title}</h3>
        <p className="text-xs text-gray-600 mt-1">{product.location}</p>
        <p className="text-xs text-gray-500">{product.quality || "Chất lượng không rõ"}</p>
      </div>

      {/* Nút CTA */}
      <button className="mt-4 text-sm font-medium bg-green-100 hover:bg-green-200 text-gray-800 py-2 rounded-xl w-full">
        Xem Chi Tiết
      </button>
    </div>
  );
};

export default ProductCard;
