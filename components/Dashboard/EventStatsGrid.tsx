"use client";
import React, { useEffect, useState } from "react";
import { ArrowUpRight, Award, Calendar, DollarSign, Users } from "lucide-react";
import axios from "axios";
import { BASE_API_URL } from "@/server";
import { handleRequest } from "../utils/apiRequest";
import { OrganizerDashboardStats } from "@/types";
import EventStateCard from "./EventStateCard";

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


const EventStatsGrid = () => {
  const [dashboardStats, setDashboardStats] =
    useState<OrganizerDashboardStats>();
  useEffect(() => {
    const getDashboardStats = async () => {
      const getDashboardStatReq = async () =>
        await axios.get(`${BASE_API_URL}/users/dashboard`, {
          withCredentials: true,
        });
      const result = await handleRequest(getDashboardStatReq);
      if (result) {
        setDashboardStats(result.data.data);
      }
    };
    getDashboardStats();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-12">
      <EventStateCard Icon={Calendar} stats={dashboardStats} />
    </div>
  );
};

export default EventStatsGrid;
