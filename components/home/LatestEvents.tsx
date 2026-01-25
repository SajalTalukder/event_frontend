"use client";

import { useEffect, useState } from "react";
import { handleRequest } from "@/components/utils/apiRequest";
import { BASE_API_URL } from "@/server";
import axios from "axios";
import { Event } from "@/types";
import { ArrowRight, Loader } from "lucide-react";

import EventCard from "../Events/EventCard";

const LatestEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const getLatestEvents = async () =>
        await axios.get(`${BASE_API_URL}/events/latest`, {
          withCredentials: true,
        });

      const result = await handleRequest(getLatestEvents, setLoading);

      if (result) {
        setEvents(result.data.data.events || []);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-10">
        <Loader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Featured Events
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Discover amazing events happening near you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event: Event) => (
            <EventCard event={event} key={event._id} isOrganizer={false} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 cursor-pointer text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-flex items-center">
            Explor All Events
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestEvents;
