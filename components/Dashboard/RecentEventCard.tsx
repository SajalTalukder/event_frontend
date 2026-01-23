import { Event } from "@/types";
import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { formatDate } from "../utils/utils";

type Props = {
  event: Event;
};

const RecentEventCard = ({ event }: Props) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";

      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 mb-2 hover:bg-gray-50 transition-colors duration-200">
      <div className="sm:flex items-start space-y-3 sm:space-y-0 space-x-4">
        <div>
          <Image
            src={event?.banner?.secure_url}
            alt={event?.name}
            width={64}
            height={64}
            className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="sm:flex space-y-4 sm:space-y-0 items-start justify-between">
            <div className="flex-1 ">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {event.name}
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(String(event.date))}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {event.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {event.location}
                </div>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <span className="text-gray-600 flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {event.attendees?.length}/{event.capacity}
                </span>
                <span className="text-gray-600 flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  $230
                </span>
                <span className="text-green-600 font-medium flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  18%
                </span>
              </div>
            </div>
            <div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  event.status
                )}`}
              >
                {event.status}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Capacity</span>
              <span>
                {Math.round(
                  ((event.attendees?.length ?? 0) / event.capacity) * 100
                )}
                %
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  (event?.attendees?.length ?? 0) / event.capacity >= 0.9
                    ? "bg-red-500"
                    : (event?.attendees?.length ?? 0) / event.capacity >= 0.7
                    ? "bg-yellow-500"
                    : "bg-blue-500"
                }`}
                style={{
                  width: `${
                    ((event.attendees?.length ?? 0) / event.capacity) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentEventCard;
