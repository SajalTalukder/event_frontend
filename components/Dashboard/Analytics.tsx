import React from "react";
import EventStatsGrid from "./EventStatsGrid";
import { Activity, Award, BarChart3, TrendingUp, Users } from "lucide-react";

const topEvents = [
  {
    name: "Tech Conference 2024",
    attendees: 250,
    revenue: "$24,750",
    engagement: "92%",
    views: 1240,
    conversion: "20.2%",
    status: "completed",
  },
  {
    name: "Marketing Workshop",
    attendees: 89,
    revenue: "$4,361",
    engagement: "87%",
    views: 567,
    conversion: "15.7%",
    status: "completed",
  },
  {
    name: "Product Launch",
    attendees: 150,
    revenue: "$0",
    engagement: "95%",
    views: 890,
    conversion: "16.9%",
    status: "upcoming",
  },
  {
    name: "Networking Dinner",
    attendees: 45,
    revenue: "$3,375",
    engagement: "88%",
    views: 234,
    conversion: "19.2%",
    status: "completed",
  },
];

const Analytics = () => {
  return (
    <div className=" p-6 mx-auto mt-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
        Analytics
      </h1>
      <p className="text-sm sm:text-base text-gray-600 mt-1">
        Track your event performance and insights
      </p>

      {/* Main Stats Grid */}

      <EventStatsGrid />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-16">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Revenue Trend
          </h3>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center border border-gray-100">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Chart visualization would go here</p>
            </div>
          </div>
        </div>

        {/* Attendance Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Attendance by Event Type
          </h3>
          <div className="h-64 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg flex items-center justify-center border border-gray-100">
            <div className="text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Chart visualization would go here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Events Table */}
      <div className="bg-white mt-16 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Top Performing Events
            </h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All Events
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engagement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topEvents.map((event, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                      {event.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{event.views}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {event.attendees}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">
                      {event.conversion}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{event.revenue}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {event.engagement}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        event.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-16">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center mb-3">
            <TrendingUp className="w-6 h-6 mr-2" />
            <h3 className="text-lg font-semibold">Growth Insight</h3>
          </div>
          <p className="text-blue-100 mb-4">
            Your events are performing 23% better than last month
          </p>
          <div className="text-sm text-blue-100 mb-4">
            Keep focusing on tech conferences - they have the highest engagement
            rate
          </div>
          <button className="bg-white bg-opacity-20 text-black px-4 py-2 rounded-lg hover:bg-opacity-30 transition-colors duration-200 text-sm font-medium">
            View Details
          </button>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-6 text-white">
          <div className="flex items-center mb-3">
            <Award className="w-6 h-6 mr-2" />
            <h3 className="text-lg font-semibold">Top Performance</h3>
          </div>
          <p className="text-green-100 mb-4">
            Consider hosting more networking events
          </p>
          <div className="text-sm text-green-100 mb-4">
            Your networking events have a 95% satisfaction rate
          </div>
          <button className="bg-white bg-opacity-20 text-black px-4 py-2 rounded-lg hover:bg-opacity-30 transition-colors duration-200 text-sm font-medium">
            Learn More
          </button>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white">
          <div className="flex items-center mb-3">
            <Activity className="w-6 h-6 mr-2" />
            <h3 className="text-lg font-semibold">Activity Summary</h3>
          </div>
          <p className="text-purple-100 mb-4">12 events created this quarter</p>
          <div className="text-sm text-purple-100 mb-4">
            Average 87% attendance rate across all events
          </div>
          <button className="bg-white bg-opacity-20 text-black px-4 py-2 rounded-lg hover:bg-opacity-30 transition-colors duration-200 text-sm font-medium">
            View Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
