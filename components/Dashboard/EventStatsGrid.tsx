"use client";
import { BASE_API_URL } from "@/server";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { handleRequest } from "../utils/apiRequest";
import { OrganizerDashboardStats } from "@/types";

const EventStatsGrid = () => {
  const [dashboardStats, setDashboardStats] =
    useState<OrganizerDashboardStats>();
  // const [growth, setGrowth] = useState({});

  useEffect(() => {
    // Fetch event stats data here
    const getEventStats = async () => {
      const getEventStatReq = async () =>
        await axios.get(`${BASE_API_URL}/users/dashboard`, {
          withCredentials: true,
        });

      const result = await handleRequest(getEventStatReq);

      if (result) {
        setDashboardStats(result.data.data);
      }
    };
    getEventStats();
  }, []);

  return (
    <div className="pt-12">
      <div className="grid grid-cols-3 gap-10 ">
        <div className="p-4 bg-gray-50 text-center shadow-md">
          <h1 className="text-xl font-bold mb-2">Total Events </h1>
          <p className="text-blue-600 font-bold text-4xl">
            {dashboardStats?.totals.totalEvents}
          </p>
        </div>
        <div className="p-4 bg-gray-50 text-center shadow-md">
          <h1 className="text-xl font-bold mb-2">Total Attendess </h1>
          <p className="text-purple-600 font-bold text-4xl">
            {dashboardStats?.totals.totalAttendees}
          </p>
        </div>
        <div className="p-4 bg-gray-50 text-center shadow-md">
          <h1 className="text-xl font-bold mb-2">Total Revenue </h1>
          <p className="text-green-600 font-bold text-4xl">
            ${dashboardStats?.totals.totalRevenue}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventStatsGrid;
