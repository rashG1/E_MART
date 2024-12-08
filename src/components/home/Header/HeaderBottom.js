import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles

const HeaderBottom = () => {
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [cartQuantity, setCartQuantity] = useState(0);
  const navigate = useNavigate();
  const ref = useRef();

  // Update cart quantity by polling local storage
  const updateCartQuantity = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
    setCartQuantity(totalQuantity);
  };

  useEffect(() => {
    updateCartQuantity();

    const intervalId = setInterval(updateCartQuantity, 1000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (ref.current.contains(e.target)) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [show, ref]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setShowUser(false);
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="w-full bg-[#E0E0FF] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <div
            onClick={() => setShow(!show)}
            ref={ref}
            className="flex h-14 cursor-pointer items-center gap-2 text-purple-700"
          >
            <HiOutlineMenuAlt4 className="w-5 h-5" />
            <p className="text-[14px] font-normal">Shop by Category</p>
            {show && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-36 z-50 bg-purple-700 w-auto text-[#767676] h-auto p-4 pb-6"
              >
                <Link to="/fashion"><li>Fashion</li></Link>
                <Link to="/home-appliances"><li>Home appliances</li></Link>
                <Link to="/electronics"><li>Electronics</li></Link>
                <Link to="/beauty-products"><li>Beauty products</li></Link>
                <Link to="/others"><li>Others</li></Link>
              </motion.ul>
            )}
          </div>

          {/* Date and Icons Container */}
          <div className="flex items-center ml-auto gap-4">
            {/* Material UI Calendar */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => <input {...params} className="p-1 border border-gray-300 rounded" />}
              />
            </LocalizationProvider>

            {/* Container for Profile and Cart */}
            <div className="flex items-center gap-4 cursor-pointer relative">
              <div onClick={() => setShowUser(!showUser)} className="flex items-center">
                <FaUser className="w-5 h-5" />
                <FaCaretDown className="w-4 h-4 ml-1" />
              </div>
              {showUser && (
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-6 left-0 z-50 bg-purple-700 w-44 text-[#767676] h-auto p-4 pb-6"
                >
                  {!isLoggedIn ? (
                    <>
                      <Link to="/signin"><li>Login</li></Link>
                      <Link onClick={() => setShowUser(false)} to="/signup"><li>Sign Up</li></Link>
                    </>
                  ) : (
                    <>
                      <li onClick={handleLogout}>Logout</li>
                      <Link to="/profile"><li>Profile</li></Link>
                    </>
                  )}
                </motion.ul>
              )}
              <Link to="/cart">
                <div className="relative">
                  <FaShoppingCart className="w-5 h-5" />
                  <span className="absolute font-titleFont top-3 -right-3 text-xs w-3 h-4 flex items-center justify-center rounded-full bg-purple-700 text-white">
                    {cartQuantity}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
