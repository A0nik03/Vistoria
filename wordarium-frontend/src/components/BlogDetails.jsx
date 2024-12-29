import React, { useContext, useState } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaFacebook, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/authContext";
import moment from "moment";
import Comments from "./Comments";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";

const BlogDetails = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const blogData = location.state?.blogData;

  const handleRedirect = () => {
    window.location.href = blogData.url;
  };

  const backgroundImage =
    blogData.image_url ||
    blogData.urlToImage ||
    blogData.coverImageURL ||
    "./blog.jpg";

  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer />
      <div
        className="relative flex-1 w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div
          style={{ backdropFilter: "blur(8px)" }}
          className="absolute inset-0 bg-black bg-opacity-50 z-0"
        ></div>

        <div className="relative z-10 w-full p-5 flex justify-between items-center md:px-10">
          <div className="flex gap-3 items-center">
            <div
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-full bg-black flex justify-center items-center hover:scale-[1.05] cursor-pointer"
            >
              <FaArrowLeft size={18} color="white" />
            </div>
            <div
              onClick={handleRedirect}
              className="w-9 h-9 rounded-full bg-black flex justify-center items-center hover:scale-[1.05] cursor-pointer"
            >
              <FaArrowUpRightFromSquare size={18} color="white" />
            </div>
          </div>

          <h1 className="text-2xl md:text-4xl font-black text-orange-600 text-center text-shadow-lg sm:mr-[44%] mr-[36%]">
            Vistoria
          </h1>

        </div>

        <div className="relative z-10 w-full px-5 md:px-20 py-10 flex flex-col lg:flex-row gap-10 pb-40">
          <div className="lg:w-[30%]">
            <div className="w-[20rem] h-[20rem] shadow-2xl rounded-lg overflow-hidden">
              <img
                src={blogData.urlToImage || blogData.coverImageURL}
                className="w-full max-w-full h-full object-cover rounded-lg"
                alt=""
              />
            </div>
            <p className="text-sm md:text-lg text-orange-600 font-medium mt-5">
              <span className="text-white">Published: </span>
              {moment(
                blogData?.publishedAt || blogData?.createdAt || Date.now()
              ).format("MMMM DD, YYYY")}
            </p>
            <p className="text-sm md:text-lg text-orange-600 font-medium mt-2">
              <span className="text-white">Source: </span>
              {blogData.source?.name ||
                blogData.source ||
                blogData.authorObject.userName}
            </p>
            <p className="text-sm md:text-lg text-orange-600 font-medium mt-2">
              <span className="text-white">Author: </span>
              {blogData?.author ||
                blogData.authorObject.userName ||
                "Anonymous"}
            </p>
          </div>

          <div className="lg:w-[70%]">
            <p className="text-xl md:text-4xl font-bold text-white mb-5">
              {blogData.title}
            </p>
            <p className="text-lg md:text-2xl font-bold text-zinc-400 mb-5">
              {blogData.description || "No description"}
            </p>
            <p className="text-sm md:text-xl text-white font-normal select-text text-wrap tracking-wider">
              {blogData.content ? blogData.content : "No content available."}{" "}
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto
              magni iure unde ad magnam dolores maiores, totam quos perferendis
              cumque cupiditate enim blanditiis eum, esse iste aliquid tempora
              repellat deleniti!{" "}
              {blogData.content ? blogData.content : "No content available."}
            </p>
            <div
              onClick={handleRedirect}
              className="hover:scale-[1.05] hover:bg-orange-700 mt-5 bg-orange-600 rounded-xl flex justify-center items-center cursor-pointer w-32 h-10"
            >
              <p className="text-[1.1rem] text-white font-medium">Read More</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 w-full bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white pt-10">
        <Comments id={blogData._id} auth={auth} />
      </div>
      <Footer/>
    </div>
  );
};

export default BlogDetails;
