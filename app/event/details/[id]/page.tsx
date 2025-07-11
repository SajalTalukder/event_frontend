"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BASE_API_URL } from "@/server";
import { handleRequest } from "@/components/utils/apiRequest";
import Image from "next/image";
import { Loader } from "lucide-react";
import { Event } from "@/types";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [registering, setRegistering] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const getSingleEvent = async () =>
        await axios.get(`${BASE_API_URL}/events/single/${id}`, {
          withCredentials: true,
        });

      const result = await handleRequest(getSingleEvent, setLoading);

      if (result) {
        setEvent(result.data.data.event);
      } else {
        setError("Event not found.");
      }
    };

    if (id) fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    if (!id) return;
    const registerEvent = async () =>
      await axios.post(
        `${BASE_API_URL}/events/register/${id}`,
        {},
        { withCredentials: true }
      );

    const result = await handleRequest(registerEvent, setRegistering);

    if (result) {
      toast.success("Successfully registered for the event!");
    } else {
      toast.error("Failed to register. You might already be registered.");
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader className="w-16 h-16 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="text-center text-red-500 mt-10">
        {error || "Event not found."}
      </div>
    );
  }

  const {
    name,
    description,
    banner,
    price,
    date,
    time,
    location,
    trainer,
    guest,
    additionalInfo,
    createdBy,
  } = event;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{name}</h1>

      <div className="w-full h-[400px] relative mb-6 rounded-md overflow-hidden shadow-md">
        <Image
          src={banner?.secure_url}
          alt={name}
          fill
          className="object-contain"
        />
      </div>

      <div className="space-y-4 text-muted-foreground">
        <p>
          <span className="font-semibold text-black">Description:</span>{" "}
          {description}
        </p>
        <p>
          <span className="font-semibold text-black">Date:</span>{" "}
          {new Date(date).toLocaleDateString()}
        </p>
        <p>
          <span className="font-semibold text-black">Time:</span> {time}
        </p>
        <p>
          <span className="font-semibold text-black">Location:</span> {location}
        </p>
        {price > 0 && (
          <p>
            <span className="font-semibold text-black">Price:</span> ৳{price}
          </p>
        )}
        <p>
          <span className="font-semibold text-black">Trainer:</span> {trainer}
        </p>
        <p>
          <span className="font-semibold text-black">Guest:</span> {guest}
        </p>
        <p>
          <span className="font-semibold text-black">Created By:</span>{" "}
          {createdBy?.username}
        </p>
        {additionalInfo && (
          <p>
            <span className="font-semibold text-black">Additional Info:</span>{" "}
            {additionalInfo}
          </p>
        )}
      </div>

      <Button
        onClick={handleRegister}
        className="mt-6 w-full sm:w-[200px]"
        disabled={registering}
      >
        {registering ? "Registering..." : "Register Now"}
      </Button>
    </div>
  );
};

export default EventDetailsPage;
