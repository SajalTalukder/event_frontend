"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "@/server";
import { handleRequest } from "@/components/utils/apiRequest";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Event } from "@/types";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(""); // debounced value

  const fetchEvents = async () => {
    const getEventsReq = async () =>
      await axios.get(`${BASE_API_URL}/events/all-events`, {
        params: {
          search: query,
          page,
          limit: 6,
        },
      });

    const result = await handleRequest(getEventsReq, setIsLoading);
    if (result) {
      setEvents(result.data.data.events);
    }
  };

  // Debounce search input
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setQuery(search);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  // Fetch events on query or page change
  useEffect(() => {
    fetchEvents();
  }, [query, page]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">All Events</h1>
        <Input
          placeholder="Search by name or location..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="w-full md:w-[300px]"
        />
      </div>

      {isLoading ? (
        <div className="w-full h-[60vh] flex items-center justify-center">
          <Loader className="w-10 h-10 animate-spin text-primary" />
        </div>
      ) : events.length === 0 ? (
        <p className="text-muted-foreground">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event: Event) => (
            <Card key={event._id} className="overflow-hidden flex flex-col">
              <Image
                src={event.banner?.secure_url}
                alt={event.name}
                width={600}
                height={400}
                className="w-full h-[200px] object-cover"
              />
              <CardContent className="p-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{event.name}</h2>
                <p className="text-muted-foreground text-sm">
                  {new Date(event.date).toLocaleDateString()} at {event.time}
                </p>
                <p className="text-sm line-clamp-2">{event.description}</p>
                <p className="text-primary font-semibold">৳{event.price}</p>
                <Link href={`/event/details/${event._id}`}>
                  <Button className="mt-2 w-full">View Details</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {events.length > 0 && (
        <div className="mt-10 flex justify-center gap-4">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
