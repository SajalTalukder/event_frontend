"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "@/server";
import { handleRequest } from "@/components/utils/apiRequest";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Event } from "@/types";
import EventCard from "@/components/Events/EventCard";

const EVENTS_PER_PAGE = 6;

const EventsPage = () => {
  // State declarations
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [priceType, setPriceType] = useState<"all" | "free" | "paid">("all");
  const [total, setTotal] = useState(0);

  // Debounce search input changes to reduce API calls
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setQuery(search);
      setPage(1); // Reset to first page on search
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [search]);

  // Fetch events whenever query, page, or priceType changes
  useEffect(() => {
    const fetchEvents = async () => {
      const getEventsReq = async () =>
        axios.get(`${BASE_API_URL}/events/all-events`, {
          params: {
            search: query,
            page,
            limit: EVENTS_PER_PAGE,
          },
        });

      const result = await handleRequest(getEventsReq, setIsLoading);

      if (result) {
        let fetchedEvents = result.data.data.events as Event[];
        const fetchedTotal = result.data.total as number;

        // Frontend filter for price type
        if (priceType === "free") {
          fetchedEvents = fetchedEvents.filter((event) => event.price === 0);
        } else if (priceType === "paid") {
          fetchedEvents = fetchedEvents.filter((event) => event.price > 0);
        }

        setEvents(fetchedEvents);
        setTotal(fetchedTotal);
      }
    };

    fetchEvents();
  }, [query, page, priceType]);

  // Calculate max pages based on total events and per-page limit
  const maxPages = Math.ceil(total / EVENTS_PER_PAGE);

  return (
    <div className="max-w-6xl mx-auto py-32 px-4">
      {/* Header and Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">All Events</h1>

        <div className="flex gap-2 w-full md:w-auto">
          {/* Price Type Filter */}
          <select
            value={priceType}
            onChange={(e) => {
              setPriceType(e.target.value as "all" | "free" | "paid");
              setPage(1); // Reset page on filter change
            }}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full md:w-[120px]"
          >
            <option value="all">All</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>

          {/* Search Input */}
          <Input
            placeholder="Search by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-[300px]"
          />
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="w-full h-[60vh] flex items-center justify-center">
          <Loader className="w-10 h-10 animate-spin text-primary" />
        </div>
      ) : events.length === 0 ? (
        <p className="text-muted-foreground text-center">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} isOrganizer={false} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {(events.length > 0 || page > 1) && (
        <div className="mt-10 flex justify-center gap-4">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <Button
            disabled={page >= maxPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, maxPages))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
