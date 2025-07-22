import React, { useEffect, useState } from "react";
import axios from "axios";
import { Leaf, Shirt, Heart, Monitor, Gift } from "lucide-react";

const iconMap = {
  "Đồ cũ": <Leaf size={24} />,
  "Đồ mặc": <Shirt size={24} />,
  "Khác": <Heart size={24} />,
  "Đồ điện tử": <Monitor size={24} />,
  "Quà tặng": <Gift size={24} />,
  "Đồ chơi": <Gift size={24} />,
};

const CategoryShortcut = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Lỗi lấy danh mục:", err));
  }, []);

  return (
    <section className="w-full bg-white py-10 rounded-2xl shadow-md mb-8">
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-16">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center bg-[#F4FCEB] hover:bg-green-100 transition rounded-xl p-4 shadow-sm hover:shadow-md"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white text-green-600 shadow-md mb-2">
              {iconMap[cat.category_name] || <Gift size={24} />}
            </div>
            <p className="text-sm font-medium text-gray-800">{cat.category_name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryShortcut;
