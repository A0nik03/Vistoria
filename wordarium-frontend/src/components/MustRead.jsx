import React, { useContext, useState, useEffect } from "react";
import { BlogContext } from "../context/blogContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useNavigate } from "react-router-dom";

const MustRead = () => {
  const { mustBlog } = useContext(BlogContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleCardClick = (index) => {
    navigate("/BlogDetail", { state: { blogData: mustBlog[index] } });
  };

  useEffect(() => {
    if (mustBlog && mustBlog.length > 0) {
      setIsLoading(false);
    }
  }, [mustBlog]);

  return (
    <div className="w-screen bg-[#f5f4f0] pb-10">
      <div className="w-[90%] lg:w-[75%] h-full mx-auto pt-5">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl lg:text-5xl font-black text-[#2b2a45] tracking-wide leading-snug mb-8 pt-10">
            Must Read
          </h1>
          <Link
            to={"/seeAll"}
            className="text-lg lg:text-xl text-orange-500 font-semibold cursor-pointer hover:underline transition-all duration-300"
          >
            See All
          </Link>
        </div>
        <div className="h-full w-full flex flex-col lg:flex-row gap-5">
          {isLoading ? (
            <div className="w-full lg:w-[60%] cursor-pointer hover:bg-white hover:p-3 mt-4 transition-all duration-300 rounded-md shadow-md hover:shadow-lg">
              <Skeleton height="40vh" width="100%" />
              <div className="mt-5 p-2">
                <Skeleton count={3} />
                <Skeleton width="60%" />
              </div>
            </div>
          ) : (
            mustBlog &&
            mustBlog.length > 1 && (
              <div className="hidden sm:block w-full lg:w-[60%] cursor-pointer hover:bg-white mt-4 transition-all duration-300 rounded-md shadow-md hover:shadow-lg">
                <div className="h-[40vh] w-full rounded-t-md relative overflow-hidden">
                  onClick={() => handleCardClick(1)}
                  <img
                    src={
                      mustBlog[1]?.urlToImage ||
                      "https://images.pexels.com/photos/3342739/pexels-photo-3342739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    }
                    alt="Article"
                    className="h-full w-full object-cover rounded-t-md transition-transform duration-500 ease-in-out hover:scale-[1.05]"
                  />
                </div>
                <div className="mt-5 p-2">
                  <p className="text-sm font-normal text-zinc-600">
                    {mustBlog[1]?.author || "No Author"}
                  </p>
                  <h2 className="text-xl font-semibold text-[#2b2a45] mt-2 transition-all duration-300 group-hover:text-orange-500">
                    {mustBlog[1]?.title || "No Title Available"}
                  </h2>
                  <p className="text-sm font-medium text-zinc-500 mt-3 transition-all duration-300 group-hover:text-zinc-700">
                    {mustBlog[1]?.description || "No description available."}
                  </p>
                  <p className="text-sm font-medium text-zinc-600 mt-5">
                    Source: {mustBlog[1]?.source || "Unknown"}
                  </p>
                </div>
              </div>
            )
          )}

          <div className="flex flex-col gap-2 w-full lg:w-[40%]">
            {isLoading
              ? Array(3)
                  .fill()
                  .map((_, index) => (
                    <div
                      key={index}
                      className="rounded-lg h-[25vh] w-full cursor-pointer flex gap-2 justify-between items-center hover:bg-white hover:p-3 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <div className="h-full w-24 md:w-32 relative overflow-hidden p-1">
                        <Skeleton height="100%" width="100%" />
                      </div>
                      <div className="w-full">
                        <Skeleton width="60%" />
                        <Skeleton width="40%" />
                      </div>
                    </div>
                  ))
              : mustBlog?.slice(2, 5).map((blog, index) => (
                  <div
                    onClick={() => handleCardClick(index + 2)}
                    key={index}
                    className="rounded-lg h-[25vh] w-full cursor-pointer flex gap-2 justify-between items-center hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <div className="h-full w-44 md:w-72 relative overflow-hidden p-1">
                      <img
                        src={
                          blog?.urlToImage ||
                          "https://images.pexels.com/photos/3342739/pexels-photo-3342739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        }
                        alt="Article"
                        className="h-full w-full object-cover rounded-md transition-transform duration-500 ease-in-out hover:scale-105"
                      />
                    </div>
                    <div className="w-full">
                      <h2 className="text-[0.9rem] font-semibold text-[#2b2a45] mt-2 transition-all duration-300 hover:text-orange-500">
                        {blog?.title.slice(0, 100) || "No Title Available"}
                      </h2>
                      <p className="text-sm font-medium text-zinc-600 mt-5">
                        Source: {blog?.source || "Unknown"}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MustRead;
