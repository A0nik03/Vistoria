import React, { useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Card = ({ data, deleteBlog, currentId }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/BlogDetail", { state: { blogData: data } });
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full group rounded-lg overflow-hidden relative h-full bg-[#f5f5f5] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
    >
      <div className="sm:h-[30vh] h-[15vh] w-full relative overflow-hidden">
        <img
          src={
            data?.image_url ||
            data?.urlToImage ||
            data?.coverImageURL ||
            "https://images.pexels.com/photos/3342739/pexels-photo-3342739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt={"Blog Image"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:blur-sm"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 flex justify-center items-center transition-all duration-300 group-hover:bg-opacity-20">
          <div className="h-20 w-20 bg-orange-500 rounded-full flex justify-center items-center opacity-0 transition-all duration-300 group-hover:opacity-90 transform group-hover:scale-110">
            <GoArrowUpRight size={30} color="white" />
          </div>
        </div>
      </div>

      <div className="p-3 flex flex-col justify-between sm:h-[38vh] h-[20vh]">
        <div>
          <p className="text-sm font-normal text-zinc-600">
            {data?.authorName || data?.author || "Google"}
          </p>
          <h2 className="sm:text-xl text-[13px] font-semibold text-[#2b2a45] mt-3 transition-colors duration-300 group-hover:text-[#1e1e38]">
            {`${data?.title.slice(0,55)}...` || <Skeleton width="80%" />}
          </h2>
          <p className="text-[0.9rem] sm:block hidden font-medium text-zinc-500 mt-3 transition-colors duration-300 group-hover:text-zinc-600">
            {`${data?.description.slice(0,120)}...` || <Skeleton count={3} />}
          </p>
        </div>
        <div>
          <p className="sm:text-[1.09] text-sm font-medium text-zinc-600 mt-1">
            {data?.source_name || data?.source?.name || data?.source || <Skeleton width="50%" />}
          </p>
        </div>
      </div>

      {currentId && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            deleteBlog(data._id);
          }}
          className="absolute bottom-4 right-4 w-10 h-10 rounded-full flex bg-orange-600 hover:bg-black justify-center items-center cursor-pointer"
        >
          <MdDelete size={24} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default Card;
