import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { blogStore } from "./store/store.jsx";
import { BrowserRouter } from "react-router-dom";
import BlogProvider from "./context/blogContext.jsx";
import AuthProvider from "./context/authContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={blogStore}>
      <AuthProvider>
        <BlogProvider>
          <App />
        </BlogProvider>
      </AuthProvider>
    </Provider>
  </BrowserRouter>
);
