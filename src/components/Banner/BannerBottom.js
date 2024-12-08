import React from "react";
import { MdLocalShipping } from "react-icons/md";
import { CgRedo } from "react-icons/cg";

const BannerBottom = () => {
  return (
    <div className="w-full bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 border-b-[1px] py-4 border-b-purple-300 px-4">
      <div className="max-w-container mx-auto h-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3 w-72 shadow-sm hover:shadow-md duration-300 bg-purple-300 text-blue-900 p-2 rounded-md">
          <span className="font-bold font-titleFont w-6 text-center">2</span>
          <p className="text-base">Two years warranty</p>
        </div>
        <div className="flex items-center gap-2 w-72 shadow-sm hover:shadow-md duration-300 bg-purple-300 text-blue-900 p-2 rounded-md">
          <MdLocalShipping className="text-xl" />
          <p className="text-base">Trustable shipping</p>
        </div>
        <div className="flex items-center gap-2 w-72 shadow-sm hover:shadow-md duration-300 bg-purple-300 text-blue-900 p-2 rounded-md">
          <CgRedo className="text-2xl" />
          <p className="text-base">Return policy in 30 days</p>
        </div>
      </div>
    </div>
  );
};

export default BannerBottom;
