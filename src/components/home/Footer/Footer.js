import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";
import FooterListTitle from "./FooterListTitle";
import { paymentCard } from "../../../assets/images";
import Image from "../../designLayouts/Image";
import { Link } from 'react-router-dom';

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const emailValidation = () => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = () => {
    if (emailInfo === "") {
      setErrMsg("Please provide an Email !");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("Please give a valid Email!");
    } else {
      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-white py-6">
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 px-4 gap-10">
        <div className="col-span-2">
          <FooterListTitle title=" More about Fluxora Shop" />
          <div className="flex flex-col gap-6">
            <p className="text-base w-full xl:w-[80%] text-white">
              Fluxora Shop is a platform where you can buy and experience 
            </p>
            <ul className="flex items-center gap-2">
              <a
                href="https://www.youtube.com/@LaunchLoom-h6u/videos"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-purple-600 text-white hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-blue-600 duration-300">
                  <FaYoutube />
                </li>
              </a>
              <a
                href="https://github.com/rashG1"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-purple-600 text-white hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-blue-600 duration-300">
                  <FaGithub />
                </li>
              </a>
              <a
                href="https://web.facebook.com/profile.php?id=61556571777003"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-purple-600 text-white hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-blue-600 duration-300">
                  <FaFacebook />
                </li>
              </a>
              <a
                href="https://www.linkedin.com/in/rashmikarathnayaka/"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-purple-600 text-white hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-blue-600 duration-300">
                  <FaLinkedin />
                </li>
              </a>
            </ul>
          </div>
        </div>
        <div>
          <FooterListTitle title="Shop" />
          <ul className="flex flex-col gap-2">
            <li className="text-base w-full xl:w-[80%] hover:text-purple-600 hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <a href="/fashion">Clothes</a>
            </li>
            <li className="font-titleFont text-base text-white hover:text-purple-600 hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <a href="/home-appliances">Home Appliances</a>
            </li>
            <li className="font-titleFont text-base text-white hover:text-purple-600 hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <a href="/electronics">Electronics</a>
            </li>
            <li className="font-titleFont text-base text-white hover:text-purple-600 hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <a href="/beauty-products">Beauty Products</a>
            </li>
            <li className="font-titleFont text-base text-white hover:text-purple-600 hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <a href="/others">Others</a>
            </li>
          </ul>
        </div>
        <div>
          <FooterListTitle title="Your account" />
          <ul className="flex flex-col gap-2">
            <li className="font-titleFont text-base text-white hover:text-purple-600 hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="font-titleFont text-base text-white hover:text-purple-600 hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <a href="/account/orders">Orders</a>
            </li>
            <li className="font-titleFont text-base text-white hover:text-purple-600 hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <a href="/account/addresses">Addresses</a>
            </li>
            <li className="font-titleFont text-base text-white hover:text-purple-600 hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <a href="/account/details">Account Details</a>
            </li>
            <li className="font-titleFont text-base text-white hover:text-purple-600 hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              <a href="/account/payment-options">Payment Options</a>
            </li>
          </ul>
        </div>
        <div className="col-span-2 flex flex-col items-center w-full px-4">
          <FooterListTitle title="Subscribe to our newsletter." />
          <div className="w-full">
            <p className="text-center mb-4 text-black">
              A at pellentesque et mattis porta enim elementum.
            </p>
            {subscription ? (
              <motion.p
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full text-center text-base font-titleFont font-semibold text-green-600"
              >
                Subscribed Successfully !
              </motion.p>
            ) : (
              <div className="w-full flex-col xl:flex-row flex justify-between items-center gap-4">
                <div className="flex flex-col w-full">
                  <input
                    onChange={(e) => setEmailInfo(e.target.value)}
                    value={emailInfo}
                    className="w-full h-12 border-b border-black bg-transparent px-4 text-black text-lg placeholder:text-base outline-none"
                    type="text"
                    placeholder="Insert your email ...*"
                  />
                  {errMsg && (
                    <p className="text-black-600 text-sm font-semibold font-titleFont text-center animate-bounce mt-2">
                      {errMsg}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSubscription}
                  className="bg-blue text-black-700 w-[30%] h-10 hover:bg-purple-600 hover:text-white duration-300 text-base tracking-wide"
                >
                  Subscribe
                </button>
              </div>
            )}

            <Image
              className={`w-[80%] lg:w-[60%] mx-auto ${
                subscription ? "mt-2" : "mt-6"
              }`}
              imgSrc={paymentCard}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
