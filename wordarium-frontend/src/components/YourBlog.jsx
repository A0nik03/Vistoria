import React, { useState, useEffect, useContext } from "react";
import PostBlog from "./PostBlog";
import Card from "./Card";
import { BlogContext } from "../context/blogContext";

const YourBlog = () => {
  const { userBlog, GetUserBlogs, DeleteUserBlog } = useContext(BlogContext);
  const [postVisible, setPostVisible] = useState(false);
  const currentUserId = userBlog ? userBlog[0]?.authorObject._id : null;

  useEffect(() => {
    GetUserBlogs();
  }, []);

  return (
    <div className="w-full h-auto bg-[#f5f4f0] overflow-hidden relative pb-16 px-4 sm:px-8 md:px-10">
      <div className="w-full h-full mx-auto pt-5">
        <div className="flex flex-col sm:flex-row justify-between items-center w-full sm:w-[75%] mx-auto mb-8">
          <h1 className="text-3xl sm:text-5xl font-black text-[#2b2a45] tracking-wide leading-snug mb-8 sm:mb-0">
            Your Blogs
          </h1>
          <div
            onClick={() => setPostVisible(!postVisible)}
            className="px-8 py-4 rounded-md border-[2px] border-[#2b2a45] transition-all duration-300 hover:scale-105 hover:bg-[#f0f0f0] cursor-pointer mt-4 sm:mt-0"
          >
            <p className="font-bold">Add Post</p>
          </div>
        </div>

        {postVisible && (
          <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-50">
            <PostBlog panelFunc={setPostVisible} panelVal={postVisible} />
          </div>
        )}

        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#f5f4f0] to-transparent pointer-events-none z-20"></div>
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#f5f4f0] to-transparent pointer-events-none z-20"></div>

        <div className="relative w-full overflow-x-auto flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 scrollbar-hide snap-x snap-mandatory">
          <div className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-5 w-full">
            {userBlog.length > 0 ? (
              userBlog.map((blog, index) => (
                <div
                  key={index}
                  className="snap-center bg-red-100 shrink-0 w-[90vw] sm:w-[70vw] md:w-[45vw] lg:w-[30vw] xl:w-[20vw] transition-transform duration-300 ease-in-out rounded-lg"
                >
                  <Card
                    data={blog}
                    deleteBlog={DeleteUserBlog}
                    currentId={currentUserId}
                  />
                </div>
              ))
            ) : (
              <div className="snap-center shrink-0 w-[90vw] sm:w-[70vw] md:w-[45vw] lg:w-[30vw] xl:w-[20vw] transition-transform duration-300 ease-in-out rounded-lg">
                <div className="relative w-full h-[60vh] sm:h-[70vh] group rounded-lg overflow-hidden bg-[#f5f5f5] hover:bg-white transition-all duration-300 hover:p-3 shadow-md hover:shadow-lg">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1672944876342-4090164e1c04?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="h-full w-full object-cover"
                    alt="A placeholder post card"
                  />
                  <div className="absolute inset-0 flex justify-center items-center">
                    <h1 className="text-white text-5xl sm:text-4xl font-extrabold text-center leading-snug tracking-wide drop-shadow-lg">
                      Start <span className="text-yellow-400">Creating</span>{" "}
                      News Posts
                    </h1>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourBlog;
