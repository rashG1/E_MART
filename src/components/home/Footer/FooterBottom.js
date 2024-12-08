import React from "react";
import { AiOutlineCopyright } from "react-icons/ai";

const FooterBottom = () => {
  return (
    <div className="w-full bg-gradient-to-r from-purple-400 via-blue-500 to-green-500 group">
      <div className="max-w-container mx-auto border-t-[1px] pt-4 pb-4">
        <p className="text-black font-normal text-center flex md:items-center justify-center text-sm">
          <a href="/home" target="_blank" rel="noreferrer">
            <span className="ml-1 text-black font-medium group-hover:text-red-300">
              © 2024 Fluxora inc.
            </span>
          </a>
          <span className="text-md mr-[1px] mt-[2px] md:mt-0 text-center hidden md:inline-flex"></span>
          All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default FooterBottom;
