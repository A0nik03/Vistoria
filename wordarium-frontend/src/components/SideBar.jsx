import React, { useContext, useState, useEffect } from "react";
import { IoMdSettings } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { MdContactless } from "react-icons/md";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { FaQuestionCircle } from "react-icons/fa";


const Sidebar = () => {
  const { auth, handleLogout } = useContext(AuthContext);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <div
      className={`h-screen w-64 overflow-y-auto scrollbar-hide p-5 flex flex-col bg-dark-600 fixed right-0 top-0 z-50 transform transition-transform duration-500 ease-out ${active ? 'translate-x-0' : 'translate-x-full'}`}
      style={{ backgroundColor: "rgba(43, 42, 69, 0.85)" }}
    >
      <div className="flex flex-col items-center mb-8">
        {auth ? (
          <>
            <div className="h-16 w-16 rounded-full overflow-hidden mb-4">
              <img
                src={auth.profileImage}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-xl font-semibold text-orange-600">
              {auth.userName}
            </p>
          </>
        ) : (
          <FaUserCircle
            size={80}
            className="text-white hover:scale-[1.03] cursor-pointer mb-4"
          />
        )}
      </div>

      <div className="flex flex-col items-center">
        <Link
          to="/"
          onClick={() => setActive(true)}
          className={`text-xl font-medium text-white border-t-[0.5px] p-3 w-full flex gap-2 items-center hover:bg-[#232238]`}
        >
          <IoMdHome size={30} />
          Home
        </Link>
        <Link
          to="/settings"
          onClick={() => setActive(true)}
          className={`text-xl font-medium text-white border-t-[0.5px] p-3 w-full flex gap-2 items-center hover:bg-[#232238]`}
        >
          <IoMdSettings size={30} />
          Settings
        </Link>

        <Link
          to="/about"
          onClick={() => setActive(true)}
          className={`text-xl font-medium text-white border-t-[0.5px] p-3 w-full flex gap-2 items-center hover:bg-[#232238]`}
        >
          <FaInfoCircle size={30} />
          About Us
        </Link>

        <Link
          to="/contact"
          onClick={() => setActive(true)}
          className={`text-xl font-medium text-white border-t-[0.5px] border-b-[0.5px] p-3 w-full flex gap-2 items-center hover:bg-[#232238]`}
        >
          <MdContactless size={30} />
          Contact Us
        </Link>

        <Link
          to="/faq"
          onClick={() => setActive(true)}
          className={`text-xl font-medium text-white border-t-[0.5px] border-b-[0.5px] p-3 w-full flex gap-2 items-center hover:bg-[#232238]`}
        >
          <FaQuestionCircle size={30} />
          FAQ
        </Link>
      </div>

      {auth ? (
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="text-xl mt-4 font-medium text-white p-3 w-[98%] flex gap-2 items-center"
          >
            <FaSignOutAlt size={30} />
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-auto">
          <Link
            to={"/register"}
            className="w-full text-lg font-medium text-white text-center py-2 hover:scale-[1.05] bg-[#4c4a75] rounded-lg cursor-pointer"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
