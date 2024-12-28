import moment from "moment";
import React, { useState, useEffect } from "react";
import { GoArrowDownRight } from "react-icons/go";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = data.slice(20, 40);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 60000);

    return () => clearInterval(interval);
  }, [items.length]);

  const currentItem = items[currentIndex];

  return (
    <div className="w-full h-auto sm:h-screen/3 bg-[#f5f4f0]">
      <div className="w-[90%] sm:w-[75%] mx-auto flex flex-col sm:flex-row pt-10">
        <div className="flex flex-col sm:w-1/2 sm:h-[60vh] sm:flex-row sm:items-center">
          <div className="p-4 flex flex-col overflow-hidden justify-between sm:h-full">
            <p className="text-zinc-500 font-normal">
              {currentItem ? (
                currentItem?.author || "Google"
              ) : (
                <Skeleton width={550} />
              )}
            </p>

            <p className="text-zinc-500 font-normal mb-5">
              {currentItem ? (
                moment(currentItem?.publishedAt || Date.now()).format(
                  "MMMM DD, YYYY hh:mm:ss A"
                )
              ) : (
                <Skeleton width={550} />
              )}
            </p>

            <h2 className="text-2xl sm:text-3xl text-[#2b2a45] font-black tracking-wide leading-snug mb-8">
              {currentItem ? (
                currentItem?.title.slice(0, 85) || "None"
              ) : (
                <Skeleton count={2} />
              )}
            </h2>

            <p className="text-zinc-400 font-normal">
              {currentItem ? (
                currentItem?.description || "None"
              ) : (
                <Skeleton count={3} />
              )}
            </p>
            <Link
              to={currentItem?.url}
              className="h-14 sm:h-16 w-full mt-8 flex justify-center items-center rounded-lg bg-orange-600 hover:scale-[1.03] hover:bg-orange-700"
            >
              <h1 className="text-white text-xl sm:text-2xl font-semibold mr-2 p-3 ">
                Read More
              </h1>
              <GoArrowDownRight size={38} color="white" />
            </Link>
          </div>
        </div>

        <div className="h-[100%] sm:h-[60vh] w-full sm:w-1/2 flex items-center mt-6 sm:mt-0">
          <div className="h-[60vh] sm:h-full w-full  hidden sm:block">
            {currentItem ? (
              <img
                src={
                  currentItem?.urlToImage ||
                  "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                className="h-full w-full rounded-lg object-cover"
                alt={currentItem?.title}
              />
            ) : (
              <Skeleton height="100%" width="100%" />
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center my-5 sm:mt-28 mt-5">
        <hr className="flex-grow border-t-2 border-gray-300" />
        <span className="mx-4 text-xl font-semibold">
          {" "}
          {currentItem ? `${currentIndex + 1}` : <Skeleton width={50} />}{" "}
          <span className="text-2xl sm:text-3xl text-[#2b2a45] font-mono">
            /
          </span>{" "}
          <span className="text-lg sm:text-2xl text-black font-sans">
            {items.length}
          </span>
        </span>
        <hr className="flex-grow border-t-2 border-gray-300" />
      </div>
    </div>
  );
};

export default Header;
