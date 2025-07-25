"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "@/server";
import { handleRequest } from "@/components/utils/apiRequest";
import Image from "next/image";
import { Loader } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Event } from "@/types";

export default function OrganizerEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(events);

  const fetchCreatedEvents = async () => {
    const getMeReq = async () =>
      await axios.get(`${BASE_API_URL}/users/me`, {
        withCredentials: true,
      });

    const result = await handleRequest(getMeReq, setIsLoading);
    if (result) {
      setEvents(result.data.data.user.createdEvents || []);
    }
  };

  useEffect(() => {
    fetchCreatedEvents();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Your Created Events</h1>

      {events.length === 0 ? (
        <p className="text-muted-foreground">No events created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-lg shadow border overflow-hidden"
            >
              <Image
                src={event.banner.secure_url}
                alt={event.name}
                width={600}
                height={300}
                className="w-full h-[200px] object-cover"
              />
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-bold">{event.name}</h2>
                <p className="text-muted-foreground text-sm">
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-sm font-medium">৳ {event.price}</p>

                <Link href={`/event/details/${event._id}`}>
                  <Button variant="outline" className="mt-2 w-full">
                    View Details
                  </Button>
                </Link>
                <Link href={`/event/edit/${event._id}`}>
                  <Button variant="outline" className="mt-2 w-full">
                    Edit Event
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
