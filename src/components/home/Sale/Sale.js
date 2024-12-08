import React from "react";
import { Link } from "react-router-dom";
import {
  saleImgOne,
  saleImgTwo,
  saleImgThree,
} from "../../../assets/images/index";
import Image from "../../designLayouts/Image";
import "./Sale.css"; // Import the CSS file

const Sale = () => {
  return (
    <div className="py-20 flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-10">
      {/* First image with overlay content */}
      <div className="relative w-full md:w-2/3 lg:w-1/2 h-full">
        <Link to="/shop">
          <Image className="h-full w-full object-cover" imgSrc={saleImgOne} />
          <div className="overlay">
            <h2 className="overlay-text">Exclusive Sale</h2>
            <Link to="/shop" className="overlay-button">
              Try Now
            </Link>
          </div>
        </Link>
      </div>

      {/* Second and third images with overlay content */}
      <div className="w-full md:w-2/3 lg:w-1/2 h-auto flex flex-col gap-4 lg:gap-10">
        <div className="relative h-1/2 w-full">
          <Link to="/shop">
            <Image className="h-full w-full object-cover" imgSrc={saleImgTwo} />
            <div className="overlay">
              <h2 className="overlay-text">Best Offers</h2>
              <Link to="/shop" className="overlay-button">
                Try Now
              </Link>
            </div>
          </Link>
        </div>
        <div className="relative h-1/2 w-full">
          <Link to="/shop">
            <Image
              className="h-full w-full object-cover"
              imgSrc={saleImgThree}
            />
            <div className="overlay">
              <h2 className="overlay-text">Limited Time</h2>
              <Link to="/shop" className="overlay-button">
                Try Now
              </Link>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sale;
