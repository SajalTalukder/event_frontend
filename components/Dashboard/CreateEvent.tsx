"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { handleRequest } from "@/components/utils/apiRequest";
import { BASE_API_URL } from "@/server";
import EventForm from "../Events/EventForm";

const CreateEvent = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleCreate = async (formData: FormData) => {
    const req = async () =>
      await axios.post(`${BASE_API_URL}/events/create-event`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
    const result = await handleRequest(req, setIsLoading);
    if (result) {
      toast.success("Event created successfully");
      router.push("/dashboard/my-events");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Create New Event
      </h1>
      <p className="text-gray-600 mb-8">
        Fill out the details below to create your event
      </p>
      <EventForm
        initialValues={{
          name: "",
          description: "",
          price: "",
          date: "",
          time: "",
          location: "",
          additionalInfo: "",
          trainerName: "",
          guest: "",
          capacity: "",
          category: "",
          bannerPreview: undefined,
        }}
        onSubmit={handleCreate}
        mode="create"
        isLoading={isLoading}
      />
    </div>
  );
};

export default CreateEvent;
