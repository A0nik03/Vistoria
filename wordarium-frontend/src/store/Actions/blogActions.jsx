import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export { removeBlog } from "../Reducers/blogSlice";
import axios from "axios";
import { loadBlog } from "../Reducers/blogSlice";

const initialState = {
  info: {
    business: [],
  },
};
export const asyncFetchBlog = (category) => async (dispatch, getState) => {
  dispatch(loadBlog({ business: [] }));

  try {
    let business = initialState.info.business;

    try {
      const response = await axios.get(`http://localhost:4002/news/latest-articles/${category}`)

      if (response.data.articles && Array.isArray(response.data.articles)) {
        business = response.data.articles;
      } else {
        toast.info("No business blogs found.");
      }
    } catch (err) {
      toast.error(`Failed to fetch business blogs: ${err.message}`);
    }

    const filteredBusiness = business.filter((article) => {
      return (
        article.author !== null &&
        article.title &&
        article.title !== "[Removed]" &&
        article.urlToImage &&
        article.urlToImage !== "" &&
        article.content &&
        article.content !== "[Removed]" &&
        article.description &&
        article.description !== "[Removed]" &&
        article.url
      );
    });

    const allBlogs = {
      business: filteredBusiness,
    };

    dispatch(loadBlog(allBlogs));
    toast.success("Blogs loaded successfully!");
  } catch (error) {
    console.error("Error in Dispatching Blog Functions:", error.message);
    toast.error("An unexpected error occurred. Please try again.");
  }
};
