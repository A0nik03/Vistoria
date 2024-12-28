import { createContext, useState, useEffect } from "react";
import axios from "../../utils/axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const BlogContext = createContext(null);

const BlogProvider = ({ children }) => {
  const [mustBlog, setMustBlog] = useState([]);
  const [userBlog, setUserBlog] = useState([]);
  const [weeklyBlog, setWeeklyBlog] = useState([]);
  const [comment, setComment] = useState([]);
  const [token, setToken] = useState(null);
  const [category, setCategory] = useState("today");

  const getMustBlog = async () => {
    try {
      const response = await axios.get(`news/must-blog`);
      console.log(response)
      const articles = response.data.articles || [];
      const processedArticles = articles
        .filter(
          (article) =>
            article.author !== null &&
            article.author !== "[Removed]" &&
            article.title &&
            article.title !== "[Removed]" &&
            article.urlToImage &&
            article.urlToImage !== "" &&
            article.content &&
            article.content !== "[Removed]" &&
            article.description &&
            article.description !== "[Removed]" &&
            article.url
        )
        .map((article) => ({
          author: article.author || "[No Author]",
          content: article.content || "[Removed]",
          description: article.description || "[Unknown]",
          title: article.title || "[Unknown]",
          publishedAt: article.publishedAt || "[Removed]",
          source: article.source
            ? article.source.name || "[Unknown]"
            : "[Unknown]",
          url: article.url || "[Removed]",
          urlToImage: article.urlToImage || "[Removed]",
        }));

      setMustBlog(processedArticles);
    } catch (error) {
      console.error("Error fetching must-read blogs:", error);
    }
  };

  const getWeeklyBlog = async () => {
    try {
      const response = await axios.get(`news/highlights`);
      const articles = response.data.articles || [];

      const processedArticles = articles
        .filter(
          (article) =>
            article.author !== null &&
            article.author !== "[Removed]" &&
            article.title &&
            article.title !== "[Removed]" &&
            article.urlToImage &&
            article.urlToImage !== "" &&
            article.content &&
            article.content !== "[Removed]" &&
            article.description &&
            article.description !== "[Removed]" &&
            article.url
        )
        .map((article) => ({
          author: article.author || "[No Author]",
          content: article.content || "[Removed]",
          description: article.description || "[Unknown]",
          title: article.title || "[Unknown]",
          publishedAt: article.publishedAt || "[Removed]",
          source: article.source
            ? article.source.name || "[Unknown]"
            : "[Unknown]",
          url: article.url || "[Removed]",
          urlToImage: article.urlToImage || "[Removed]",
        }));

      setWeeklyBlog(processedArticles);
    } catch (error) {
      console.error("Error fetching Weekly blogs:", error);
    }
  };

  const GetUserBlogs = async () => {
    if (!token) return;
    try {
      const response = await axios.get("blog/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.data.blogs && Array.isArray(response.data.blogs)) {
        setUserBlog(response.data.blogs);
      } else {
        console.log("No user blogs uploaded yet.");
      }
    } catch (err) {
      console.log("An error occurred while uploading" + err.message);
    }
  };

  // const CommentOnBlog = async (id) => {
  //   if (!token) return;
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:4002/blog/comment/${id}`,
  //       { comment: "This is a comment" },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //     setComment(response.data)
  //   } catch (err) {
  //     toast.error("Failed to comment on blog. Please try again later.");
  //   }
  // };

  const DeleteUserBlog = async (id) => {
    if (!token) return;
    try {
      const response = await axios.delete(
        `blog/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setUserBlog((prevUserBlogs) =>
          prevUserBlogs.filter((blog) => blog._id !== id)
        );
      } else {
        console.log("Blog deleted successfully");
      }
    } catch (err) {
      console.log("Error deleting blogs: " + err.message);
    }
  };

  useEffect(() => {
    const userData = Cookies.get("userData");

    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        setToken(parsedUserData.token);
        if (!parsedUserData.token) {
          throw new Error("Token is missing");
        }
      } catch (err) {
        toast.error("Error parsing user data. Please log in again.");
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      GetUserBlogs();
    }
  }, [token]);

  useEffect(() => {
    getMustBlog();
  }, []);

  useEffect(() => {
    getWeeklyBlog();
  }, []);

  const contextValue = {
    category,
    setCategory,
    mustBlog,
    getMustBlog,
    userBlog,
    GetUserBlogs,
    setUserBlog,
    DeleteUserBlog,
    comment,
    setComment,
    token,
    setToken,
    weeklyBlog,
    getWeeklyBlog,
  };

  return (
    <BlogContext.Provider value={contextValue}>{children}</BlogContext.Provider>
  );
};

export default BlogProvider;
