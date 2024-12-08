import React from "react";
import Category from "./shopBy/Category";

const ShopSideNav = () => {
  return (
    <div className="w-full bg-white p-4">
      <div className="w-full flex flex-col gap-6">
        {/* Category Header Button */}
        <button
          className="bg-purple-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-500"
          onClick={() => console.log("Category header clicked!")}
        >
          Shop by Category
        </button>

        {/* Render Category Component */}
        <Category icons={false} />

        {/* Price button placeholder */}
        {/* Add Price component or button here */}
      </div>
    </div>
  );
};

export default ShopSideNav;
