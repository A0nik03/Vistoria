import React, { useContext, useState, useEffect } from "react";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { AuthContext } from "../context/authContext";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "./SideBar";

const NavBar = ({ isTransparent }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [active, setActive] = useState(0);
  const location = useLocation();

  const tabs = ["Home", "About", "Contact Us", "FAQ"];

  useEffect(() => {
    const currentPath = location.pathname;
    const tabIndex = tabs.findIndex(
      (tab) =>
        currentPath ===
        (tab.toLowerCase() === "home" ? "/" : `/${tab.toLowerCase()}`)
    );
    setActive(tabIndex);
  }, [location.pathname, tabs]);

  return (
    <div
      className={`h-[25%] ${
        isTransparent ? "w-[80%] mx-auto" : "w-full"
      } p-6 md:p-10 flex items-center ${
        isTransparent ? "bg-transparent" : "bg-[#f5f4f0]"
      }`}
    >
      <div
        className={`w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center ${isTransparent ? "text-[#f5f4f0]" : "text-[#2b2a45]"}`}
      >
        <div className="hidden md:flex gap-10">
          {tabs.map((tab, index) => (
            <Link
              key={index}
              to={
                tab.split(" ")[0].toLowerCase() === "home"
                  ? "/"
                  : `/${tab.split(" ")[0].toLowerCase()}`
              }
              onClick={() => setActive(index)}
              className={`text-xl font-medium leading-10`}
            >
              <span className="flex flex-col gap-1">
                {tab}
                {active === index && (
                  <span className="h-1 w-full bg-[#2b2a45] rounded-xl"></span>
                )}
              </span>
            </Link>
          ))}
        </div>

        <h1 className="text-3xl hidden sm:block md:text-5xl sm:mr-[20%] mr-[36%] font-black leading-10">
          Vistoria
        </h1>

        <div className="flex justify-between w-full sm:w-0 mt-4 items-center">
          <div className="relative">
            <AiOutlineMenu
              size={28}
              className="cursor-pointer hover:scale-[1.1]"
              onClick={() => setShowMenu((prev) => !prev)}
            />
          </div>
          <h1 className="sm:hidden text-3xl md:text-5xl font-black leading-10">
            Vistoria
          </h1>
        </div>
      </div>

      {showMenu && (
        <div className="fixed inset-0 right-0 z-50 transition-all duration-500 ease-in-out">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 top-0 w-64 h-full text-white">
            <Sidebar />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
