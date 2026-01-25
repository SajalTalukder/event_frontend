"use client";
import { BASE_API_URL } from "@/server";
import { RootState } from "@/store/store";
import axios from "axios";
import {
  ArrowUpRight,
  BarChart3,
  Calendar,
  ChevronRight,
  Download,
  TrendingUp,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleRequest } from "../utils/apiRequest";
import Link from "next/link";
import { Event } from "@/types";
import RecentEventCard from "./RecentEventCard";
import EventStatsGrid from "./EventStatsGrid";

// THIS VALUE WILL BE REPLACED WITH THE BACKEND VALUE

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [recentEvents, setRecentEvents] = useState<Event[]>([]);

  useEffect(() => {
    const getRecentEvents = async () => {
      const getRecentEventReq = async () =>
        await axios.get(`${BASE_API_URL}/events/organizer-recent-events`, {
          withCredentials: true,
        });
      const result = await handleRequest(getRecentEventReq);
      setRecentEvents(result?.data.data.events);
    };

    getRecentEvents();
  }, []);

  return (
    <div className=" p-6 mx-auto mt-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
        Dashboard
      </h1>
      <p className="text-sm sm:text-base text-gray-600 mt-1">
        Welcome back, {user?.username} Here&apos;s your event overview.
      </p>
      {/* Main Stats Grid */}

      <EventStatsGrid />

      {/* bottom part  */}
      <div className="grid grid-cols-1 mt-16 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Recent events */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Recent Events
                </h2>

                <Link href="/dashbopard/my-events">
                  <button className="text-blue-600 cursor-pointer hover:text-blue-700 text-sm font-medium flex items-center">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {recentEvents.length === 0 && (
                <p className="text-center text-gray-500 p-6">
                  No recent events
                </p>
              )}

              {recentEvents.map((event) => {
                return (
                  <div key={event._id}>
                    <RecentEventCard event={event} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Stats  */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-xl p-6 text-white">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-6 h-6 mr-2" />
              <h3 className="text-lg font-bold">Performance Insights</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-blue-100">Event Success Rate</span>
                <span className="font-bold">96%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-100">Avg. Attendance</span>
                <span className="font-bold">89%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-100">Customer Satisfaction</span>
                <span className="font-bold">4.9/5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-100">Revenue Growth</span>
                <span className="font-bold">+25%</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-white bg-opacity-20 backdrop-blur-sm text-black py-3 rounded-xl hover:bg-gray-200 cursor-pointer transition-all duration-200 text-sm font-medium flex items-center justify-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Detailed Analytics
            </button>
          </div>
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div>
              <Link
                href="/dashboard/create-event"
                className="mb-5 cursor-pointer block"
              >
                <button className="w-full flex items-center justify-between p-4 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors duration-200 group">
                  <span className="flex items-center">
                    <Calendar className="w-5 h-5 mr-3" />
                    Create New Event
                  </span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                </button>
              </Link>

              <Link
                href="/dashboard/attendees"
                className="mb-5 cursor-pointer block"
              >
                <button className="w-full flex items-center justify-between p-4 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors duration-200 group">
                  <span className="flex items-center">
                    <Users className="w-5 h-5 mr-3" />
                    Manage Attendees
                  </span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                </button>
              </Link>

              <Link
                href="/dashboard/analytics"
                className="mb-5 cursor-pointer block"
              >
                <button className="w-full flex items-center justify-between p-4 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors duration-200 group">
                  <span className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-3" />
                    View Analytics
                  </span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                </button>
              </Link>

              <button className="w-full flex items-center cursor-pointer justify-between p-4 bg-orange-50 text-orange-700 rounded-xl hover:bg-orange-100 transition-colors duration-200 group">
                <span className="flex items-center">
                  <Download className="w-5 h-5 mr-3" />
                  Export Reports
                </span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
