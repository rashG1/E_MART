import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import './Shop.css'; // Import the CSS file for the Shop component

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentSlide, setCurrentSlide] = useState(0); // State for current slide index
  const texts = [
    "Discover the latest trends in fashion.",
    "Shop our exclusive collection of accessories.",
    "Find the perfect outfit for any occasion.",
  ]; // Texts for each slide

  // Function to update the slide index (could be called in a slider animation)
  const updateSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % texts.length);
  };

  useEffect(() => {
    const interval = setInterval(updateSlide, 10000); // Change text every 10 seconds
    return () => clearInterval(interval); // Clear the interval on unmount
  }, []);

  return (
    <div className="shop-container max-w-container mx-auto px-4">
      {/* Background image that serves as a slider */}
      <div className="background-image"></div>
      
      <div className="content">
        <Breadcrumbs title="Products" />
        {/* ================= Products Start here =================== */}
        <div className="w-full h-full flex pb-20 gap-10">
          <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
            <ShopSideNav />
          </div>
          <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
            <ProductBanner itemsPerPageFromBanner={setItemsPerPage} />
            {/* Decorative elements can be added here */}
            <div className="decorative-elements">
              <h2 className="decorative-title">Welcome to Our Shop</h2>
              <p className="decorative-description">{texts[currentSlide]}</p> {/* Change text based on current slide */}
            </div>
           
          </div>
        </div>
        {/* ================= Products End here ===================== */}
      </div>
    </div>
  );
};

export default Shop;
