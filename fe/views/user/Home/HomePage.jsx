import React from "react";
import HowItWorks from "./components/HowItWorks";
import WhyChooseUs from "./components/WhyChooseUs";
import UserStory from "./components/UserStory";
import CallToAction from "./components/CallToAction";
import BannerSection from "./components/BannerSection";
import SearchBar from "./components/SearchBar";
import ProductSection from "./components/ProductSection";
import CategoryShortcut from "./components/CategoryShortcut";
// Dummy data
const sampleProducts = Array(8).fill({
  image: "https://i.imgur.com/VZJrZ5f.png",
  title: "Áo sơ mi nam",
  location: "Q.1, TP.HCM",
  time: "15 phút trước",
  owner: "Anh QUÝ TẶNG",
  status: "Mới",
});
const HomePage = () => {
  return (
    <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-6 flex flex-col items-center">
      <BannerSection/>
      <SearchBar/>  
        <ProductSection title="Danh sách phổ biến" products={sampleProducts} />
      <ProductSection title="Danh mục Quần Áo" products={sampleProducts} />
      <CategoryShortcut />
      <HowItWorks />
      <WhyChooseUs />
      <UserStory />
      <CallToAction />
    </div>
  );
};

export default HomePage;
