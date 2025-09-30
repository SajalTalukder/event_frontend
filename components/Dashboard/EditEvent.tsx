"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { handleRequest } from "@/components/utils/apiRequest";
import { BASE_API_URL } from "@/server";

import { Loader } from "lucide-react";
import EventForm from "../Events/EventForm";
import { EventFormValues } from "@/types";

const EditEvent = ({ id }: { id: string }) => {
  const router = useRouter();

  const [formValues, setFormValues] = useState<EventFormValues | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchEvent = async () => {
      const req = async () =>
        await axios.get(`${BASE_API_URL}/events/single/${id}`, {
          withCredentials: true,
        });
      const result = await handleRequest(req, setIsLoading);
      if (result?.data?.status === "success") {
        const event = result.data.data.event;
        setFormValues({
          name: event.name || "",
          description: event.description || "",
          price: event.price?.toString() || "",
          date: event.date ? event.date.split("T")[0] : "",
          time: event.time || "",
          location: event.location || "",
          additionalInfo: event.additionalInfo || "",
          trainerName: event.trainerName || "",
          guest: event.guest || "",
          capacity: event.capacity?.toString() || "",
          category: event.category || "",
          bannerPreview: event.banner?.secure_url || null,
        });
      }
    };
    fetchEvent();
  }, [id]);

  const handleUpdate = async (formData: FormData) => {
    const req = async () =>
      await axios.patch(`${BASE_API_URL}/events/update-event/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
    const result = await handleRequest(req, setIsLoading);
    if (result) {
      toast.success("Event updated successfully");
      router.push("/dashboard/my-events");
    }
  };

  if (!formValues) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Event</h1>
      <p className="text-gray-600 mb-8">Update your event details below</p>
      <EventForm
        initialValues={formValues}
        onSubmit={handleUpdate}
        mode="edit"
        isLoading={isLoading}
      />
    </div>
  );
};

export default EditEvent;
