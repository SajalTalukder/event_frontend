"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { handleRequest } from "@/components/utils/apiRequest";
import { BASE_API_URL } from "@/server";
import axios from "axios";
import Image from "next/image";
import { toast } from "sonner";
import { LoadingButton } from "@/components/Helper/LoadingButton";
import { useRouter } from "next/navigation";

const CreateEventPage = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    date: "",
    time: "",
    location: "",
    additionalInfo: "",
    trainer: "",
    guest: "",
  });

  const [banner, setBanner] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBanner(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!banner) {
      toast.error("Please upload a banner image.");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("banner", banner);

    const createEventRequest = async () =>
      await axios.post(`${BASE_API_URL}/events/create-event`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    const result = await handleRequest(createEventRequest, setIsLoading);
    if (result) {
      toast.success("Event created successfully");
      router.push("/profile");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Create New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Text Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Name</Label>
            <Input
              name="name"
              value={form.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label>Price</Label>
            <Input
              type="number"
              name="price"
              value={form.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label>Date</Label>
            <Input
              type="date"
              name="date"
              value={form.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label>Time</Label>
            <Input
              type="time"
              name="time"
              value={form.time}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              name="location"
              value={form.location}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label>Trainer</Label>
            <Input
              name="trainer"
              value={form.trainer}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label>Guest</Label>
            <Input
              name="guest"
              value={form.guest}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Textarea */}
        <div>
          <Label>Description</Label>
          <Textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label>Additional Info</Label>
          <Textarea
            name="additionalInfo"
            value={form.additionalInfo}
            onChange={handleInputChange}
          />
        </div>

        {/* Image Upload */}
        <div>
          <Label>Event Banner</Label>
          <Input type="file" accept="image/*" onChange={handleBannerChange} />
          {bannerPreview && (
            <Image
              src={bannerPreview}
              alt="Banner Preview"
              width={800}
              height={400}
              className="mt-4 rounded-md object-cover border shadow"
            />
          )}
        </div>

        <LoadingButton isLoading={isLoading}>Create Event</LoadingButton>
      </form>
    </div>
  );
};

export default CreateEventPage;
