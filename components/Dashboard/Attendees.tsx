"use client";
import { BASE_API_URL } from "@/server";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { handleRequest } from "../utils/apiRequest";
import { AttendeesType } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MailIcon, MapIcon } from "lucide-react";
import { MdEvent } from "react-icons/md";

const Attendees = () => {
  const [attendees, setAttendees] = useState<AttendeesType[]>([]);
  const [totalEvent, setTotalEvent] = useState();
  const [totalAttendees, setTotalAttendess] = useState();
  console.log(attendees, totalAttendees, totalEvent);

  useEffect(() => {
    const getOrganizerAttendees = async () => {
      const getAttendeesReq = async () =>
        await axios.get(`${BASE_API_URL}/users/organizer/attendees`, {
          withCredentials: true,
        });
      const result = await handleRequest(getAttendeesReq);
      if (result) {
        console.log(result);

        setAttendees(result.data.data.attendees);
        setTotalAttendess(result.data.totalAttendees);
        setTotalEvent(result.data.totalEvents);
      }
    };
    getOrganizerAttendees();
  }, []);

  return (
    <div className=" p-6 mx-auto mt-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
        Attendees
      </h1>
      <p className="text-sm sm:text-base text-gray-600 mt-1">
        Manage your event participants
      </p>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-10 ">
        <div className="bg-green-600/10 p-4 text-center rounded shadow-md">
          <h1 className="text-5xl text-blue-800 font-bold">{totalAttendees}</h1>
          <h1 className="mt-3 text-lg font-semibold text-gray-600">
            Total Attendees
          </h1>
        </div>
        <div className="bg-yellow-500/20 p-4 text-center shadow-md rounded">
          <h1 className="text-5xl text-green-800 font-bold">{totalEvent}</h1>
          <h1 className="mt-3 text-lg font-semibold text-gray-600">
            Total Events
          </h1>
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          List Of Attendees
        </h1>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
          {attendees.map((attendee, i) => {
            return (
              <div key={i} className="bg-gray-100 p-4 rounded-md">
                <Avatar className="w-16 h-16 mx-auto border-4 border-blue-500 shadow-lg bg-gray-300">
                  <AvatarImage src={attendee?.profilePhoto.secure_url} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="mt-2 text-center font-semibold">
                  {attendee.username}
                </h1>
                <div className="mt-6 space-y-2 text-gray-600">
                  <div className="flex items-center space-x-1 text-sm">
                    <MailIcon className="w-3 h-3" />
                    <h1>{attendee.email}</h1>
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <MdEvent className="w-3 h-3" />
                    <h1>{attendee.eventName}</h1>
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <MapIcon className="w-3 h-3" />
                    <h1>{attendee.eventLocation}</h1>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Attendees;
