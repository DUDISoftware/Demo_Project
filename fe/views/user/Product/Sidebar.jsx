import React from 'react';

const Sidebar = () => {
  return (
    <aside className="space-y-6">
      {/* Câu chuyện người nhận */}
      <div className="bg-white rounded-xl shadow p-4 text-sm">
        <h3 className="font-semibold mb-2">Câu chuyện của người nhận</h3>
        <ul className="list-disc ml-4 space-y-1">
          <li>“Tôi đã nhận được chiếc áo ấm cho mùa đông này...”</li>
          <li>“Bé nhà tôi rất thích món đồ chơi này!”</li>
          <li>“Rất cảm ơn bạn đã tặng mình máy xay sinh tố.”</li>
        </ul>
      </div>

      {/* Điều ước mới */}
      <div className="bg-white rounded-xl shadow p-4 text-sm">
        <h3 className="font-semibold mb-2">Điều ước mới</h3>
        <p>Bé cần cặp đi học cho năm học mới. Ai có thể chia sẻ không?</p>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-xl shadow p-4 text-sm">
        <h3 className="font-semibold mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {["Quần áo", "Điện tử", "Sách", "Đồ chơi"].map((tag) => (
            <span
              key={tag}
              className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
