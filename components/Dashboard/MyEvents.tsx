"use client";
import { BASE_API_URL } from "@/server";
import { Event } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { handleRequest } from "../utils/apiRequest";
import { Loader, PlusSquare, Search } from "lucide-react";
import { Button } from "../ui/button";
import Select from "react-select";
import EventCard from "../Events/EventCard";
import useDebounce from "@/hooks/useDebounce";
import Pagination from "../Helper/Pagination";
import { toast } from "sonner";

const MyEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const debouncedSearch = useDebounce(search, 400); // debounce 400ms

  const selectFilterOption = [
    { value: "all", label: "All Event" },
    { value: "upcoming", label: "Upcoming" },
    { value: "completed", label: "Completed" },
  ];

  // 🔹 Reset to page 1 if filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status]);

  // 🔹 Fetch events whenever filters or page changes
  useEffect(() => {
    const fetchEvents = async () => {
      const getOrganizerEventsReq = async () =>
        await axios.get(`${BASE_API_URL}/events/organizer-events`, {
          params: {
            search: debouncedSearch || undefined,
            status: status !== "all" ? status : undefined,
            page,
            limit: 6,
          },
          withCredentials: true,
        });

      const result = await handleRequest(getOrganizerEventsReq, setIsLoading);

      if (result) {
        setEvents(result?.data?.data?.events || []);
        setTotalPages(result?.data?.totalPages || 1);
      }
    };

    fetchEvents();
  }, [debouncedSearch, status, page]);

  const deleteEventHandler = async (id: string) => {
    const deleteReq = async () =>
      await axios.delete(`${BASE_API_URL}/events/delete-event/${id}`, {
        withCredentials: true,
      });

    const result = await handleRequest(deleteReq);

    if (result) {
      setEvents((prevEvents) => {
        const updated = prevEvents.filter((event) => event._id !== id);

        // If the current page becomes empty after delete
        if (updated.length === 0 && page > 1) {
          // Go to previous page but never below 1
          setPage((prevPage) => Math.max(prevPage - 1, 1));
          // Keep current events until the useEffect refetches
          return prevEvents;
        }

        // Normal case: just remove deleted event
        return updated;
      });

      toast.success("Event Deleted Successfully");
    }
  };

  return (
    <div className="space-y-6 p-6 mx-auto mt-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            My Events
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Manage and track your events
          </p>
        </div>
        <div>
          <Button variant={"default"} size={"lg"}>
            <PlusSquare />
            Create Event
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative flex items-center">
            <Select
              options={selectFilterOption}
              defaultValue={selectFilterOption[0]}
              isSearchable={false}
              onChange={(option) => {
                setStatus(option?.value || "all");
                setPage(1);
              }}
              className="w-[200px] "
            />
          </div>
        </div>
      </div>

      {isLoading && <Loader className="w-6 h-6 animate-spin mt-16 mx-auto" />}

      {!isLoading && events.length > 0 && (
        <>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-10">
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                isOrganizer={true}
                onDelete={deleteEventHandler}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            className="mt-8"
            onPageChange={(newPage) => setPage(newPage)}
            page={page}
            totalPages={totalPages}
          />
        </>
      )}

      {!isLoading && events.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No events found</p>
      )}
    </div>
  );
};

export default MyEvents;
