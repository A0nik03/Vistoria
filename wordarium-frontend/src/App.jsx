import { useContext } from "react";
import BlogDetails from "./components/BlogDetails";
import FAQ from "./components/FAQ";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import SeeAllBlogs from "./components/SeeAllBlogs";
import Register from "./components/register";

const App = () => {
    const { auth, panel, setPanel } = useContext(AuthContext);
    const access = auth?.token ? true : false;
  return (
    <div className="relative w-screen h-screen font-[Satoshi]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seeAll" element={<SeeAllBlogs />} />
        <Route path="/BlogDetail" element={<BlogDetails />} />
      </Routes>
    </div>
  );
};

export default App;
