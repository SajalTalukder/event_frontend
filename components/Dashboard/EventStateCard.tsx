import { OrganizerDashboardStats } from "@/types";
import React, { ReactNode } from "react";

type Props = {
  Icon: ReactNode;
  stats: OrganizerDashboardStats | undefined;
};

const EventStateCard = ({}: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg `}>
          <Calendar className={`w-6 h-6 text-blue-600`} />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold text-gray-900">
          {dashboardStats?.totals.totalEvents}
        </p>
        <p className="text-sm font-medium text-gray-700">Total Events</p>
        <p className="text-xs text-gray-500">{dashboardStats?.growth.events}</p>
      </div>
    </div>
  );
};

export default EventStateCard;
