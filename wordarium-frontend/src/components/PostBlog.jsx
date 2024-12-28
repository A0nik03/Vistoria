import React, { useState, useRef, useContext } from "react";
import axios from "../utils/userAxios";
import { ImCross } from "react-icons/im";
import { BlogContext } from "../context/blogContext";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const defaultImageUrl =
  "https://www.pngitem.com/pimgs/m/365-3654427_cloud-upload-icon-svg-hd-png-download.png";

const PostBlog = ({ panelFunc, panelVal }) => {
  const [image, setImage] = useState(defaultImageUrl);
  const [active, setActive] = useState(null);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const contentRef = useRef();
  const sourceRef = useRef();
  const imageRef = useRef();
  const { GetUserBlogs } = useContext(BlogContext);

  const categoryOptions = [
    { value: "Technology", label: "Technology" },
    { value: "Education", label: "Education" },
    { value: "Business", label: "Business" },
    { value: "Anime", label: "Anime" },
    { value: "Public", label: "Public" },
    { value: "Health", label: "Health" },
    { value: "Science", label: "Science" },
    { value: "Sports", label: "Sports" },
    { value: "World", label: "World" },
    { value: "Politics", label: "Politics" },
  ];

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };


  const handleCategoryChange = (selectedOption) => {
    setActive(selectedOption.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !titleRef.current.value ||
      !contentRef.current.value ||
      !active || 
      !descriptionRef.current.value
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", titleRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("content", contentRef.current.value);
    formData.append("category", active);
    formData.append("source", sourceRef.current.value);
    if (imageRef.current.files[0]) {
      formData.append("coverImage", imageRef.current.files[0]);
    }

    try {
      const response = await axios.post(
        "blog/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        alert("Blog Posted Successfully!");
        GetUserBlogs();
        setImage(defaultImageUrl);
        titleRef.current.value = "";
        descriptionRef.current.value = "";
        contentRef.current.value = "";
        setActive(null);
        sourceRef.current.value = "";
        imageRef.current.value = "";
      } else {
        alert("Failed to post blog. Please try again.");
      }
    } catch (error) {
      console.error("Error posting blog:", error);
      alert(
        error.response?.data?.message ||
          "An error occurred while posting the blog."
      );
    }
  };

  return (
    <div className="w-[90%] sm:w-[75vw] h-[90%] sm:h-[85vh] bg-gray-800 bg-opacity-50 rounded-md p-5 flex flex-col justify-center">
      <div className="flex justify-end">
        <ImCross
          size={20}
          color="#fff"
          onClick={() => panelFunc(!panelVal)}
          className="cursor-pointer"
        />
      </div>
      <h1 className="text-4xl font-bold text-white text-center mb-5 sm:mb-20">
        Add Blog
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Enter Title"
              ref={titleRef}
              className="w-full p-3 text-xl font-medium rounded-md bg-[#f5f4f0] text-[#2b2a45] outline-none"
            />
            <input
              type="text"
              placeholder="Source Name"
              ref={sourceRef}
              className="w-full p-3 text-xl font-medium rounded-md bg-[#f5f4f0] text-[#2b2a45] outline-none"
            />
          </div>
          <input
            type="text"
            placeholder="Description"
            ref={descriptionRef}
            className="w-full p-3 rounded-md text-xl font-medium bg-[#f5f4f0] text-[#2b2a45] outline-none"
          />
          <textarea
            placeholder="Content"
            rows={4}
            ref={contentRef}
            className="w-full p-3 rounded-md text-xl font-medium bg-[#f5f4f0] text-[#2b2a45] outline-none"
          />
          <Dropdown
            options={categoryOptions}
            value={categoryOptions.find((option) => option.value === active)}
            onChange={handleCategoryChange}
            placeholder="Select Category"
            className="w-full md:w-48 bg-white rounded-lg text-xl font-medium text-[#2b2a45] outline-none text-nowrap"
          />
        </div>
        <div className="flex-1 flex flex-col items-center gap-4">
          <label htmlFor="imageUpload" className="cursor-pointer">
            <div className="w-full sm:w-[80%] h-[25vh] sm:h-[40vh] overflow-hidden rounded-md">
              <img
                src={image}
                alt={
                  image === defaultImageUrl
                    ? "Upload Placeholder"
                    : "Selected Cover Image"
                }
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            ref={imageRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-orange-600 text-white font-bold rounded-md hover:bg-orange-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostBlog;
