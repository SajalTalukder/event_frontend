import { BarChart3, Shield, Users, Zap } from "lucide-react";
import React from "react";

const features = [
  {
    icon: Zap,
    title: "Easy Event Creation",
    description:
      "Create and customize events in minutes with our intuitive builder",
  },
  {
    icon: Users,
    title: "Attendee Management",
    description: "Track registrations, send updates, and manage your audience",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Get insights on event performance and attendee engagement",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Process payments safely with our integrated payment system",
  },
];

const Feature = () => {
  return (
    <div className="py-20">
      {/* Features Section */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose EventPro?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Everything you need to create successful events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Feature;
