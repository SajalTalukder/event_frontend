"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BASE_API_URL } from "@/server";
import { handleRequest } from "@/components/utils/apiRequest";
import Image from "next/image";
import {
  Loader,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  User,
  Users,
} from "lucide-react";
import { Event } from "@/types";
import axios from "axios";
import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
import { TbCategory } from "react-icons/tb";
import { MdOutlineReduceCapacity } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setAuthUser } from "@/store/authSlice";

const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // const [registering, setRegistering] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const dispatch = useDispatch();

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
    const checkoutReq = async () =>
      await axios.post(
        `${BASE_API_URL}/payments/checkout/${id}`,
        {},
        { withCredentials: true },
      );

    const result = await handleRequest(checkoutReq);

    if (result) {
      dispatch(setAuthUser(result.data.data.user));
      window.location.href = result.data.url;
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

  // Destructure event data safely with fallbacks
  const {
    name,
    description,
    banner,
    price,
    date,
    time,
    location,
    trainerName,
    guest,
    additionalInfo,
    createdBy,
    capacity,
    category,
  } = event;
  console.log(event);

  return (
    <div className="max-w-6xl pt-[20vh] mx-auto px-4 py-10 space-y-8">
      {/* Event Title */}
      <h1 className=" text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900">
        {name}
      </h1>

      {/* Banner Image */}
      <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
        {banner?.secure_url ? (
          <Image
            src={banner.secure_url}
            alt={name}
            fill
            className="object-cover w-full h-full"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
          <Calendar className="text-blue-600" size={24} />
          <div>
            <p className="text-sm text-gray-600">Date</p>
            <p className="font-semibold text-gray-900">
              {new Date(date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
          <Clock className="text-blue-600" size={24} />
          <div>
            <p className="text-sm text-gray-600">Time</p>
            <p className="font-semibold text-gray-900">{time}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
          <MapPin className="text-blue-600" size={24} />
          <div>
            <p className="text-sm text-gray-600">Location</p>
            <p className="font-semibold text-gray-900">{location}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
          <TbCategory className="text-blue-600" size={24} />
          <div>
            <p className="text-sm text-gray-600">Category</p>
            <p className="font-semibold text-gray-900">{category}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
          <User className="text-blue-600" size={24} />
          <div>
            <p className="text-sm text-gray-600">Trainer</p>
            <p className="font-semibold text-gray-900">
              {trainerName || "N/A"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
          <MdOutlineReduceCapacity className="text-blue-600" size={24} />
          <div>
            <p className="text-sm text-gray-600">Capacity</p>
            <p className="font-semibold text-gray-900">{capacity}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
          <Users className="text-blue-600" size={24} />
          <div>
            <p className="text-sm text-gray-600">Guest</p>
            <p className="font-semibold text-gray-900">{guest || "N/A"}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
          <DollarSign className="text-blue-600" size={24} />
          <div>
            <p className="text-sm text-gray-600">Price</p>
            <p className="font-semibold text-gray-900">
              {price > 0 ? `৳${price}` : "Free"}
            </p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <section className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">About the Event</h2>
        <p className="text-gray-700 whitespace-pre-line">{description}</p>
        {additionalInfo && (
          <>
            <h3 className="text-xl font-semibold mt-4">
              Additional Information
            </h3>
            <p className="text-gray-700 whitespace-pre-line">
              {additionalInfo}
            </p>
          </>
        )}
      </section>

      {/* Organizer Info */}
      {createdBy && (
        <section className="bg-white p-6 rounded-lg shadow flex items-center gap-6">
          <h1 className="text-lg font-semibold">Created By</h1>
          <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300">
            <Image
              src={createdBy.profilePhoto.secure_url || "/default-avatar.png"}
              alt={createdBy.username || "Organizer"}
              width={80}
              height={80}
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {createdBy.username}
            </h3>
            {/* If you want to add more organizer details here */}
          </div>
        </section>
      )}

      {/* Register Button */}
      <div className="flex justify-center">
        {user && (
          <Button
            onClick={handleRegister}
            // disabled={registering}
            className="px-10 py-3 text-lg font-semibold"
          >
            Register
          </Button>
        )}

        {!user && (
          <Button
            onClick={() => {
              router.push("/auth/login");
            }}
            className="px-10 py-3 text-lg font-semibold"
          >
            Login To Register
          </Button>
        )}
      </div>
    </div>
  );
};

export default EventDetailsPage;
