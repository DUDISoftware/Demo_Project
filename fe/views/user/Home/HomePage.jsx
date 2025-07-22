import React, { useEffect, useState } from "react";
import axios from "axios";
import HowItWorks from "./components/HowItWorks";
import WhyChooseUs from "./components/WhyChooseUs";
import UserStory from "./components/UserStory";
import CallToAction from "./components/CallToAction";
import BannerSection from "./components/BannerSection";
import SearchBar from "./components/SearchBar";
import ProductSection from "./components/ProductSection";
import CategoryShortcut from "./components/CategoryShortcut";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/category");
      setCategories(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 lg:px-20 py-6 flex flex-col items-center">
      <BannerSection />
      <SearchBar />

      {/* Danh sách sản phẩm phổ biến (tạm là 8 sản phẩm đầu tiên) */}
      <ProductSection title="Danh sách phổ biến" products={products.slice(0, 8)} />

      {/* Hiển thị sản phẩm theo từng danh mục */}
      {categories.map((cat) => {
        const productsInCategory = products.filter((p) => p.category_id === cat._id);
        if (productsInCategory.length === 0) return null;

        return (
          <ProductSection
            key={cat._id}
            title={`Danh mục ${cat.category_name}`}
            products={productsInCategory.slice(0, 8)} // giới hạn 8 sản phẩm/danh mục
          />
        );
      })}

      <CategoryShortcut />
      <HowItWorks />
      <WhyChooseUs />
      <UserStory />
      <CallToAction />
    </div>
  );
};

export default HomePage;
