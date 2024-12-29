import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Settings = () => {
  return (
    <div className="min-h-screen bg-[#f5f4f0]">
      <NavBar />
      
      <div className="bg-[#2b2a45] text-white py-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold">Settings</h1>
          <p className="text-lg mt-4 leading-8">
            Customize your experience and manage your preferences.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-6 md:px-16 flex justify-center items-center min-h-[40vh]">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#2b2a45]">Coming Soon</h2>
          <p className="mt-4 text-lg text-zinc-600 leading-7">
            Stay tuned! Exciting features are on their way.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Settings;
