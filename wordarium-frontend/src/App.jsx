import BlogDetails from "./components/BlogDetails";
import FAQ from "./components/FAQ";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import SeeAllBlogs from "./components/SeeAllBlogs";
import Register from "./components/Register";

const App = () => {
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
