import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md transition p-8 flex flex-col justify-between text-center relative">
      {/* Badge top left */}
      <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded bg-blue-600 text-white">
        Sách Vở
      </span>

      {/* Badge top right */}
      <span className="absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded bg-yellow-400 text-white">
        Mới
      </span>

      {/* Image */}
      <img
        src={product.image}
        alt={product.title}
        className="mx-auto h-36 object-contain mb-4"
      />

      {/* Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-sm">{product.title}</h3>
        <p className="text-xs text-gray-600">Còn mới 90%</p>
        <p className="text-xs text-gray-600">Đã giặt sạch sẽ.</p>
        <p className="text-xs text-gray-600 mt-1">{product.location}</p>
      </div>

      {/* CTA Button */}
      <button className="mt-4 text-sm font-medium bg-green-100 hover:bg-green-200 text-gray-800 py-2 rounded-xl w-full">
        Xem Chi Tiết
      </button>
    </div>
  );
};

export default ProductCard;
