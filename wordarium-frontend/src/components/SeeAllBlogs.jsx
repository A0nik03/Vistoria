import React, { useContext } from "react";
import { BlogContext } from "../context/blogContext";
import NavBar from "./NavBar";
import { useLocation, useNavigate } from "react-router-dom";

const SeeAllBlogs = () => {
  const { mustBlog, weeklyBlog } = useContext(BlogContext);
  const navigate = useNavigate();
  const location = useLocation();
  const source = location.state?.source;

  let blogData, heading, subheading;
  switch (source) {
    case "highlights":
      blogData = weeklyBlog;
      heading = "Weekly Highlights";
      subheading = "Check out the top weekly stories and highlights!";
      break;
    case "latestArticles":
      blogData = [];
      heading = "Latest Articles";
      subheading = "Stay updated with the most recent articles and news.";
      break;
    default:
      blogData = mustBlog;
      heading = "Discover Must-Read Blogs";
      subheading =
        "Explore insightful articles, trending stories, and expert opinions.";
  }

  const handleNavigate = (index) => {
    navigate("/BlogDetail", { state: { blogData: blogData[index] } });
    console.log(blogData[index]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white">
      <NavBar isTransparent={true} />
      <div
        className="relative h-[40vh] w-full bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <h1 className="text-5xl lg:text-7xl font-extrabold text-orange-500 text-center mb-4">
            {heading}
          </h1>
          <p className="text-lg lg:text-xl text-gray-200 text-center">
            {subheading}
          </p>
        </div>
      </div>

      <div className="w-[90%] lg:w-[75%] mx-auto py-10">
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 grid-flow-dense"
          style={{
            gridAutoRows: "minmax(200px, auto)",
          }}
        >
          {blogData && blogData.length > 0 ? (
            blogData.map((blog, index) => {
              const rowSpan = index % 3 === 0 ? 2 : 1;
              const colSpan = index % 4 === 0 ? 2 : 1;

              return (
                <div
                  onClick={() => handleNavigate(index)}
                  key={index}
                  className="relative group overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 cursor-pointer bg-black"
                  style={{
                    gridRowEnd: `span ${rowSpan}`,
                    gridColumnEnd: `span ${colSpan}`,
                  }}
                >
                  <div className="h-full w-full overflow-hidden">
                    <img
                      src={
                        blog?.urlToImage ||
                        "https://images.pexels.com/photos/3342739/pexels-photo-3342739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      }
                      alt="Article"
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500 p-4 flex flex-col justify-end">
                    <h3 className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors duration-300">
                      {blog?.title || "No Title Available"}
                    </h3>
                    <p className="text-sm text-gray-300 mt-2 line-clamp-3">
                      {blog?.description || "No description available."}
                    </p>
                    <p className="text-sm font-medium text-gray-400 mt-3">
                      Source: {blog?.source || "Unknown"}
                    </p>
                    <p className="text-sm font-light text-gray-400 mt-1">
                      Author: {blog?.author || "No Author"}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-xl text-center">
              No blogs available to display.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeeAllBlogs;
