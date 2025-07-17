import React from "react";
import ProductCard from "./ProductCard";

const ProductSection = ({ title, products }) => {
  return (
    <section className="py-10 w-full text-center">
      <h2 className="text-xl md:text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4">
        {products.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
