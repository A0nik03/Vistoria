import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-[#f5f4f0]">
      <NavBar />

      <div className="bg-[#2b2a45] text-white py-12 px-6 md:px-16">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold">Frequently Asked Questions</h1>
          <p className="text-lg mt-4 leading-8">
            Welcome to our FAQ section! Here, we have compiled answers to some of the most frequently asked questions to help you understand more about Vistoria.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-6 md:px-16">
        <div className="space-y-12">
          {[
            {
              question: "What is Vistoria?",
              answer: "Vistoria is a platform that provides the latest news, insightful stories, and thought-provoking articles to keep you informed, engaged, and empowered.",
            },
            {
              question: "How can I contact Vistoria?",
              answer: "You can contact us through the 'Contact Us' section available on the website. We will be happy to assist you.",
            },
            {
              question: "How do I contribute to Vistoria?",
              answer: "If you're interested in contributing, you can submit your articles via our submission portal. Our editorial team will review and get back to you.",
            },
            {
              question: "Is Vistoria free to use?",
              answer: "Yes, Vistoria is completely free to access. We aim to provide quality content without any paywalls.",
            },
            {
              question: "How can I stay updated with the latest news?",
              answer: "You can follow us on social media platforms such as Facebook, Twitter, and LinkedIn to stay updated with the latest news and articles.",
            },
          ].map((faq, index) => (
            <div key={index} className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold text-[#2b2a45]">{faq.question}</h3>
              <p className="text-lg text-zinc-600 mt-4">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
