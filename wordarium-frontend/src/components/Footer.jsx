import React from "react";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const tabs = ["About", "Contact Us" ,"FAQ"];
  return (
    <div className="h-auto w-full bg-[#2a2a42] py-20">
      <div className="w-[90%] lg:w-[75%] mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl text-white font-black tracking-wider text-center">
          Subscribe to our
        </h1>
        <div className="relative">
          <span className="absolute left-0 right-0 bottom-[1px] h-[12px] bg-[#dc82fa] md:h-[16px]"></span>
          <h1 className="text-4xl md:text-6xl text-white font-black tracking-wider mt-2 relative text-center">
            newsletter
          </h1>
        </div>

        <div className="w-full md:w-[50%] h-16 md:h-20 bg-white rounded-lg mt-10 flex items-center justify-between px-2 md:px-2 shadow-md">
          <input
            type="text"
            className="w-[75%] h-full text-sm md:text-xl font-medium text-zinc-600 pl-3 md:pl-5 outline-none"
            placeholder="Enter Your Email"
          />
          <div className="w-[20%] h-full flex justify-center items-center">
            <div className="bg-[#2a2a42] h-10 md:h-[80%] w-10 ml-10 md:w-[80%] rounded-md flex justify-center items-center">
              <MdEmail size={30} md={50} color="white" />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row justify-between items-center mt-20">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-5 lg:mb-0">
            Vistoria
          </h1>

          <div className="flex flex-wrap justify-center gap-6 mb-5 lg:mb-0">
            {tabs.map((tab, index) => (
              <h1
                key={index}
                className="text-sm md:text-xl font-medium text-white leading-10 cursor-pointer hover:text-[#dc82fa] transition-all duration-300"
              >
                {tab}
              </h1>
            ))}
          </div>

          <div className="flex gap-4">
            <FaFacebook size={28} className="text-white hover:text-[#dc82fa] transition-all duration-300" />
            <AiFillTwitterCircle size={32} className="text-white hover:text-[#dc82fa] transition-all duration-300" />
            <HiDotsCircleHorizontal size={34} className="text-white hover:text-[#dc82fa] transition-all duration-300" />
          </div>
        </div>

        <hr className="w-full border-[0.8px] bg-zinc-200 mt-14" />

        <div className="w-full flex flex-col lg:flex-row justify-between items-center mt-10 gap-6">
          <p className="text-center text-sm md:text-xl font-normal text-zinc-300">
            Copyright © 2023 Vistoria. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm md:text-xl font-normal text-zinc-300">
            <p className="cursor-pointer hover:text-[#dc82fa] transition-all duration-300">
              Privacy Policy
            </p>
            <p className="cursor-pointer hover:text-[#dc82fa] transition-all duration-300">
              Terms & Conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
