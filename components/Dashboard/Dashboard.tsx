"use client";
import { RootState } from "@/store/store";
import { ArrowUpRight, Award, Calendar, DollarSign, Users } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

// THIS VALUE WILL BE REPLACED WITH THE BACKEND VALUE
const stats = [
  {
    label: "Total Events",
    value: "12",
    change: "+2 this month",
    changeType: "positive",
    icon: Calendar,
    color: "text-blue-600",
    bg: "bg-blue-50",
    trend: "+16.7%",
  },
  {
    label: "Total Attendees",
    value: "1,247",
    change: "+89 this week",
    changeType: "positive",
    icon: Users,
    color: "text-green-600",
    bg: "bg-green-50",
    trend: "+12.3%",
  },
  {
    label: "Revenue",
    value: "$24,500",
    change: "+$3,200 this month",
    changeType: "positive",
    icon: DollarSign,
    color: "text-purple-600",
    bg: "bg-purple-50",
    trend: "+15.2%",
  },
  {
    label: "Avg. Rating",
    value: "4.8",
    change: "+0.2 from last month",
    changeType: "positive",
    icon: Award,
    color: "text-orange-600",
    bg: "bg-orange-50",
    trend: "+4.3%",
  },
];

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className=" p-6 mx-auto mt-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
        Dashboard
      </h1>
      <p className="text-sm sm:text-base text-gray-600 mt-1">
        Welcome back, {user?.username} Here&apos;s your event overview.
      </p>
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-12">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex items-center text-sm font-medium text-green-600">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  {stat.trend}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm font-medium text-gray-700">
                  {stat.label}
                </p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
