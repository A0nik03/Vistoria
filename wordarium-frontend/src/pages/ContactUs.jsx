import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import NavBar from "../components/NavBar";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-[#f5f4f0]">
      <NavBar />
      <div className="bg-[#2b2a45] text-white py-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
          <p className="text-lg mt-4 leading-8">
            We would love to hear from you! Whether you have a question, suggestion, or feedback, feel free to reach out to us.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#2b2a45]">Get in Touch</h2>
            <form action="#" method="POST" className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-lg text-[#2b2a45]">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full p-3 border border-[#2b2a45] rounded-lg mt-2"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg text-[#2b2a45]">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full p-3 border border-[#2b2a45] rounded-lg mt-2"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-lg text-[#2b2a45]">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  className="w-full p-3 border border-[#2b2a45] rounded-lg mt-2"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-orange-600 text-white py-3 px-8 w-full rounded-lg mt-4 hover:bg-orange-700"
              >
                Send Message
              </button>
            </form>
          </div>
          <img
            src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Contact Us"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="bg-white py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#2b2a45]">Connect With Us</h2>
          <p className="text-lg text-zinc-600 mt-4">
            Follow us on social media to stay updated and engage with us.
          </p>
          <div className="flex justify-center gap-8 mt-8">
            <a
              href="https://facebook.com"
              className="text-blue-600 hover:text-blue-800"
            >
              <FaFacebook size={30} />
            </a>
            <a
              href="https://linkedin.com"
              className="text-blue-700 hover:text-blue-900"
            >
              <FaLinkedin size={30} />
            </a>
            <a
              href="https://twitter.com"
              className="text-blue-400 hover:text-blue-600"
            >
              <FaTwitter size={30} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
