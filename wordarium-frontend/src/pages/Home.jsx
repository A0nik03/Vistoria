import NavBar from "../components/NavBar";
import Header from "../components/Header";
import Register from "../components/register";
import YourBlog from "../components/YourBlog";
import LatestArticles from "../components/LatestArticles";
import Weekly from "../components/Weekly";
import MustRead from "../components/MustRead";
import Footer from "../components/Footer";
import { BlogContext } from "../context/blogContext";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useSelector, useDispatch } from "react-redux";
import { asyncFetchBlog, removeBlog } from "../store/Actions/blogActions";

const Home = () => {
  const { info } = useSelector((state) => state.blogs);
  const { category, setCategory, catBlog } = useContext(BlogContext);
  
  const { auth, panel, setPanel } = useContext(AuthContext);
  const access = auth?.token ? true : false;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryChange = (newCategory) => {
    setCategory((prevCategory) => (prevCategory === newCategory ? "" : newCategory));
  };
  
  useEffect(() => {
    if (category) {
      setIsLoading(true);
      dispatch(asyncFetchBlog(category)).finally(() => {
        setIsLoading(false);
      });
    }

    return () => {
      dispatch(removeBlog());
    };
  }, [dispatch,category]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar isTransparent={false} />
      {info && <Header data={info.business} />}
      
      {access && (
        <div>
          <YourBlog panelFunc={setPanel} panelVal={panel} />
        </div>
      )}
      
      {info && (
        <LatestArticles
          data={info.business || catBlog }
          category={category}
          func={handleCategoryChange}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      
      {info && <MustRead data={info.business} />}
      
      <Weekly />
      <Footer />
    </div>
  );
};

export default Home;
