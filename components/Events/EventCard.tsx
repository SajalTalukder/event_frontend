import { Event } from "@/types";
import { Calendar, Edit, MapPin, Trash2, Users } from "lucide-react";
import Image from "next/image";
import React from "react";
import { formatDate, formatTime } from "../utils/utils";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  event: Event;
  isOrganizer?: boolean;
  onDelete?: (id: string) => void;
};

const EventCard = ({ event, isOrganizer, onDelete }: Props) => {
  const router = useRouter();
  const fillPercent = (
    ((event?.attendees?.length ?? 0) / event.capacity) *
    100
  ).toFixed(1);

  const remainSpot = event.capacity - (event.attendees?.length || 0);

  const capacityPercentage = Number(
    ((remainSpot / event.capacity) * 100).toFixed(1),
  );

  return (
    <div className="rounded-xl  shadow-md border  border-gray-100 overflow-hidden">
      <div>
        <Image
          src={event?.banner?.secure_url}
          alt={event.name}
          width={600}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer capitalize transition-colors duration-200">
          {event.name}
        </h3>
        {event.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {event.description}
          </p>
        )}
        {/* Event info */}
        <div className="space-y-3 mb-4 mt-6">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-3 text-blue-500 flex-shrink-0" />
            <span>
              {formatDate(String(event?.date))} • {formatTime(event?.time)}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-3 text-blue-500 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-3 text-blue-500 flex-shrink-0" />
            <span>
              {`${event.attendees?.length}/${event.capacity}`} attendees
            </span>
            <span className="ml-2 text-xs text-gray-500">
              ({fillPercent}% Full)
            </span>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Capacity</span>
            <span>{capacityPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                Number(fillPercent) >= 90
                  ? "bg-red-500"
                  : Number(fillPercent) >= 70
                    ? "bg-yellow-500"
                    : "bg-blue-500"
              }`}
              style={{ width: `${fillPercent}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {remainSpot} spots remaining
          </div>
        </div>
        {/* tags */}

        <div className="mt-4 mb-4">
          <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
            {event.category}
          </span>
        </div>

        <div className="text-xs text-gray-500 mt-4 flex items-center">
          <span>by {event.createdBy.username}</span>
        </div>

        {!isOrganizer && (
          <div className="mt-5">
            <Link href={`/events/details/${event._id}`}>
              <Button className="w-full" size={"lg"}>
                View Details
              </Button>
            </Link>
          </div>
        )}
        {isOrganizer && (
          <div className="mt-5 flex flex-col sm:flex-row items-center gap-3 ">
            <Button
              onClick={() => {
                router.push(`/dashboard/edit-event/${event._id}`);
              }}
              variant={"outline"}
              size={"lg"}
              className="w-full sm:w-fit"
            >
              <Edit />
              Edit Event
            </Button>
            <Button
              onClick={() => {
                onDelete?.(event?._id);
              }}
              variant={"destructive"}
              size={"lg"}
              className="w-full sm:w-fit"
            >
              <Trash2 />
              Delete Event
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
