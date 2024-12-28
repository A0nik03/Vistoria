import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import Cards from "./Cards";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const LatestArticles = ({ data, func }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(null);

  useEffect(() => {
    setSearchTerm("");
  }, [active]);

  useEffect(() => {
    if (data && data.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [data]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    await func(searchTerm.toLowerCase());
  };

  const handleCategoryChange = async (selectedOption) => {
    const category = selectedOption.value;
    if (category) {
      setIsLoading(true);
      await func(category.toLowerCase());
      setActive(category);
    }
  };

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

  return (
    <div className="w-full bg-[#f5f4f0] p-5">
      <div className="w-full md:w-[80%] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl md:text-5xl font-black text-[#2b2a45] tracking-wide leading-snug mb-8 pt-10">
            Latest Articles
          </h1>

          <div className="flex items-center gap-8">
            <div className="w-full md:w-auto mt-4 md:mt-0">
              <Dropdown
                options={categoryOptions}
                onChange={handleCategoryChange}
                value={
                  categoryOptions.find((option) => option.value === active) ||
                  null
                }
                placeholder="Select Category"
                className="w-full md:w-48 bg-white rounded-lg text-xl font-medium text-[#2b2a45] outline-none text-nowrap"
              />
            </div>

            <div className="flex items-center border-b-2 w-full md:w-48 mt-4 md:mt-0">
              <input
                type="text"
                className="w-full md:w-40 py-4 bg-transparent outline-none text-xl font-medium"
                placeholder="Search"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <CiSearch
                onClick={handleSearch}
                size={36}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="h-full w-full pt-5">
          {isLoading ? (
            <div className="flex flex-wrap gap-6 justify-center whitespace-pre-wrap">
              {Array(8)
                .fill()
                .map((_, i) => (
                  <div
                    key={i}
                    className="w-full sm:w-[48%] md:w-[24%] lg:w-[22%] xl:w-[22%] h-[76vh] group rounded-lg overflow-hidden relative bg-[#f5f5f5] hover:bg-white transition-all duration-300 hover:p-1 shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <Skeleton height="50%" width="100%" />
                    <div className="p-3">
                      <Skeleton count={6} />
                      <Skeleton width="100%" />
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="h-auto">
              <Cards data={data} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestArticles;
