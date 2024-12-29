import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-[#f5f4f0]">
      <NavBar />
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white py-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold">About Vistoria</h1>
          <p className="text-lg mt-4 leading-8">
            At <span className="text-orange-400">Vistoria</span>, we are dedicated to delivering the latest news, 
            insightful stories, and thought-provoking articles. Our mission is to keep you informed, engaged, and empowered.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#2b2a45]">Our Mission</h2>
            <p className="mt-4 text-lg text-zinc-600 leading-7">
              To provide accurate, timely, and unbiased news to our audience. We believe that well-informed readers are the backbone of a vibrant and thriving society.
            </p>
          </div>
          <img
            src="https://images.pexels.com/photos/7666429/pexels-photo-7666429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Our Mission"
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
          <img
            src="https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Our Vision"
            className="rounded-lg shadow-lg order-last md:order-first"
          />
          <div>
            <h2 className="text-3xl font-bold text-[#2b2a45]">Our Vision</h2>
            <p className="mt-4 text-lg text-zinc-600 leading-7">
              To become a trusted global news platform that connects people with information, ignites conversations, and drives meaningful change.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#2b2a45]">Meet The Developer</h2>
          <p className="text-lg text-zinc-600 mt-4">
            Behind every story, there’s an individual dedicated to bringing you the truth.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-12">
            <div className="p-6 bg-[#f5f4f0] shadow-lg rounded-lg text-center">
              <img
                src="./team.jpeg"
                alt="dev"
                className="mx-auto rounded-full w-32 h-32 object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">Bhanu Pratap Singh</h3>
              <p className="text-sm text-zinc-600 mt-2">
                Passionate about storytelling and leading into development with a focus on delivering engaging content.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
