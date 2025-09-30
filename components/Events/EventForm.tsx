"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/components/Helper/LoadingButton";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Users,
  Image as ImageIcon,
  FileText,
  User as UserIcon,
} from "lucide-react";
import { EventFormValues } from "@/types";

interface EventFormProps {
  initialValues: EventFormValues;
  onSubmit: (formData: FormData) => Promise<void>;
  mode?: "create" | "edit";
  isLoading: boolean;
}

const EventForm: React.FC<EventFormProps> = ({
  initialValues,
  onSubmit,
  mode = "create",
  isLoading,
}) => {
  const [form, setForm] = useState(initialValues);
  const [banner, setBanner] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(
    initialValues.bannerPreview || null
  );

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev: EventFormValues) => ({ ...prev, [name]: value }));
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
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, value as string)
    );
    if (banner) formData.append("banner", banner);
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-6">
          <FileText className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">
            Basic Information
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Label className="mb-3">Event Name</Label>
            <Input
              name="name"
              value={form.name}
              onChange={handleInputChange}
              required
              className="py-6"
            />
          </div>
          <div className="md:col-span-2">
            <Label className="mb-3">Description</Label>
            <Textarea
              name="description"
              value={form.description}
              onChange={handleInputChange}
              required
              className="h-[10rem]"
            />
          </div>
        </div>
      </div>

      {/* Date & Time */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-6">
          <Calendar className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Date & Time</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="mb-3">Date</Label>
            <Input
              type="date"
              name="date"
              value={form.date}
              onChange={handleInputChange}
              required
              className="py-6"
            />
          </div>
          <div>
            <Label className="mb-3">Time</Label>
            <Input
              type="time"
              name="time"
              value={form.time}
              onChange={handleInputChange}
              required
              className="py-6"
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-6">
          <MapPin className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Location</h2>
        </div>
        <Label className="mb-3">Venue Address</Label>
        <Input
          name="location"
          value={form.location}
          onChange={handleInputChange}
          required
          className="py-6"
        />
      </div>

      {/* Pricing */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-6">
          <Users className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Pricing</h2>
        </div>
        <Label className="mb-3">Ticket Price</Label>
        <Input
          type="number"
          name="price"
          value={form.price}
          onChange={handleInputChange}
          required
          min="0"
          className="py-6"
        />
      </div>

      {/* Capacity & Category */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-6">
          <Users className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">
            Capacity & Category
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="mb-3">Capacity</Label>
            <Input
              type="number"
              name="capacity"
              value={form.capacity}
              onChange={handleInputChange}
              required
              min="1"
              className="py-6"
            />
          </div>
          <div>
            <Label className="mb-3">Category</Label>
            <select
              name="category"
              value={form.category}
              onChange={handleInputChange}
              required
              className="w-full py-3 px-3 border border-gray-300 rounded-md"
            >
              <option value="" disabled hidden>
                Select category
              </option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Seminar</option>
              <option value="Conference">Conference</option>
              <option value="Webinar">Webinar</option>
              <option value="Meetup">Meetup</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Trainers & Guests */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-6">
          <UserIcon className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">
            Trainers & Guests
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="mb-3">Trainer</Label>
            <Input
              name="trainerName"
              value={form.trainerName}
              onChange={handleInputChange}
              className="py-6"
            />
          </div>
          <div>
            <Label className="mb-3">Guest</Label>
            <Input
              name="guest"
              value={form.guest}
              onChange={handleInputChange}
              className="py-6"
            />
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-6">
          <FileText className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">
            Additional Details
          </h2>
        </div>
        <Textarea
          name="additionalInfo"
          value={form.additionalInfo}
          onChange={handleInputChange}
          className="h-[8rem]"
        />
      </div>

      {/* Banner */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-6">
          <ImageIcon className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Event Banner</h2>
        </div>
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

      {/* Submit */}
      <div>
        <LoadingButton isLoading={isLoading}>
          {mode === "create" ? "Create Event" : "Update Event"}
        </LoadingButton>
      </div>
    </form>
  );
};

export default EventForm;
