import { ArrowRight } from "lucide-react";
import React from "react";

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 h-screen w-full flex items-center justify-center flex-col">
      <div className="text-center p-6 mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Create Amazing{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Events
          </span>
        </h1>
        <p className="text-sm sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          The all-in-one platform for event organizers to create, manage, and
          grow their events. From intimate workshops to large conferences,
          we&apos;ve got you covered.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 cursor-pointer text-white sm:px-8 sm:py-4 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform flex items-center justify-center">
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          <button className="border-2 cursor-pointer border-blue-600 text-blue-600  sm:py-4 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors duration-200">
            Browse Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
