import { ArrowRight } from "lucide-react";
import React from "react";

const Cta = () => {
  return (
    <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      {/* CTA Section */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Create Your First Event?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of organizers who trust EventPro
        </p>
        <button className="bg-white cursor-pointer text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center">
          Get Started Free
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Cta;
