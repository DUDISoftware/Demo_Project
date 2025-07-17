import React from "react";
import { Leaf, Shirt, Heart, Monitor, Gift } from "lucide-react";

const categories = [
  { icon: <Leaf size={24} />, label: "Đồ cũ" },
  { icon: <Shirt size={24} />, label: "Đồ mặc" },
  { icon: <Heart size={24} />, label: "Khác" },
  { icon: <Monitor size={24} />, label: "Đồ điện tử" },
  { icon: <Gift size={24} />, label: "Quà tặng" },
  { icon: <Gift size={24} />, label: "Đồ chơi" },
  

];

const CategoryShortcut = () => {
  return (
    <section className="w-full bg-white py-10 rounded-2xl shadow-md mb-8">
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-16">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center bg-[#F4FCEB] hover:bg-green-100 transition rounded-xl p-4 shadow-sm hover:shadow-md"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white text-green-600 shadow-md mb-2">
              {cat.icon}
            </div>
            <p className="text-sm font-medium text-gray-800">{cat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryShortcut;
