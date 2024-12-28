import React, { useContext, useEffect, useState } from "react";
import { BlogContext } from "../context/blogContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";

const Weekly = () => {
  const { weeklyBlog } = useContext(BlogContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/seeAll", { state: { source: "highlights" } });
  };

  useEffect(() => {
    setIsLoading(!(weeklyBlog && weeklyBlog.length > 0));
  }, [weeklyBlog]);

  const renderCard = (data) => (
    <div
      key={data?.id}
      className="relative min-w-[70vw] md:min-w-[30vw] lg:min-w-[20vw] h-[40vh] overflow-hidden group cursor-pointer transition-transform duration-300 hover:z-10 hover:scale-[1.1]"
    >
      <img
        src={
          data?.image_url ||
          data?.urlToImage ||
          data?.coverImageURL ||
          "https://images.pexels.com/photos/3342739/pexels-photo-3342739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        alt="Blog Cover"
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute bottom-4 left-4 right-4 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
        <p className="text-sm font-light">
          {data?.authorName || data?.author || "Unknown Author"}
        </p>
        <h3 className="text-lg font-semibold mt-1">
          {data?.title || "Blog Title"}
        </h3>
      </div>
    </div>
  );

  return (
    <div className="w-screen h-auto bg-[#f5f4f0] py-10">
      <div className="w-[85%] mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-[#2b2a45]">
          Highlights
        </h1>
        <button onClick={handleNavigate} className="text-lg font-medium text-orange-500 hover:underline">
          See All
        </button>
      </div>

      <div className="flex overflow-x-scroll gap-4 px-5 scrollbar-hide">
        {isLoading
          ? Array(10)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="min-w-[70vw] md:min-w-[30vw] lg:min-w-[20vw] h-[40vh] rounded-lg overflow-hidden relative"
                >
                  <Skeleton width="100%" height="100%" />
                </div>
              ))
          : weeklyBlog.map((blog) => renderCard(blog))}
      </div>
    </div>
  );
};

export default Weekly;
