"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { LoadingButton } from "@/components/Helper/LoadingButton";
import { handleRequest } from "@/components/utils/apiRequest";
import { BASE_API_URL } from "@/server";
import axios from "axios";
import Image from "next/image";

const EditEventPage = () => {
  const { id } = useParams();
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

  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [newBanner, setNewBanner] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEvent = useCallback(async () => {
    const req = async () =>
      await axios.get(`${BASE_API_URL}/events/single/${id}`, {
        withCredentials: true,
      });
    const result = await handleRequest(req, setIsLoading);
    if (result) {
      const event = result.data.data.event;
      setForm({
        name: event.name || "",
        description: event.description || "",
        price: event.price || "",
        date: event.date?.slice(0, 10) || "",
        time: event.time || "",
        location: event.location || "",
        additionalInfo: event.additionalInfo || "",
        trainer: event.trainer || "",
        guest: event.guest || "",
      });
      setBannerPreview(event.banner?.secure_url || null);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchEvent();
  }, [id, fetchEvent]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewBanner(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (newBanner) {
      formData.append("banner", newBanner);
    }

    const updateRequest = async () =>
      await axios.patch(`${BASE_API_URL}/events/update-event/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

    const result = await handleRequest(updateRequest, setIsLoading);
    if (result) {
      toast.success("Event updated successfully");
      router.push("/profile");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Event</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Text Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "name",
            "price",
            "date",
            "time",
            "location",
            "trainer",
            "guest",
          ].map((field) => (
            <div key={field}>
              <Label>{field[0].toUpperCase() + field.slice(1)}</Label>
              <Input
                name={field}
                type={
                  field === "price"
                    ? "number"
                    : field === "date"
                    ? "date"
                    : field === "time"
                    ? "time"
                    : "text"
                }
                value={form[field as keyof typeof form]}
                onChange={handleInputChange}
                required={[
                  "name",
                  "price",
                  "date",
                  "time",
                  "location",
                ].includes(field)}
              />
            </div>
          ))}
        </div>

        {/* Description */}
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

        <LoadingButton isLoading={isLoading}>Update Event</LoadingButton>
      </form>
    </div>
  );
};

export default EditEventPage;
