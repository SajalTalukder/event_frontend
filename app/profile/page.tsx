"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { BASE_API_URL } from "@/server";
import axios from "axios";
import { handleRequest } from "@/components/utils/apiRequest";
import Image from "next/image";
import { User, Event } from "@/types";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Profile = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const getMe = async () => {
    // request function
    const getMeReq = async () =>
      await axios.get(`${BASE_API_URL}/users/me`, {
        withCredentials: true,
      });
    //   get the response as result from handleAuthRequest Function
    const result = await handleRequest(getMeReq, setIsLoading);
    // Check if result exist
    if (result) {
      // save data to state
      setUserData(result.data.data.user);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader className="w-32 h-32 animate-spin" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load profile. Please refresh.
      </div>
    );
  }

  const isOrganizer = userData.role === "organizer";
  const events = isOrganizer
    ? userData.createdEvents
    : userData.registerdEvents;

  return (
    <div className="w-full mb-10">
      {/* Top Banner */}
      <div className="h-[25vh] w-full bg-pink-500/20 rounded-b-xl" />

      {/* Profile Section */}
      <div className="flex flex-col items-center mt-[-3rem]">
        <Avatar className="w-32 h-32 border-4 border-white shadow-xl bg-gray-300">
          <AvatarImage src={userData?.profilePhoto?.secure_url} />
          <AvatarFallback className="text-3xl font-bold uppercase">
            {userData?.username?.slice(0, 2)}
          </AvatarFallback>
        </Avatar>

        <div className="mt-4 text-center space-y-1">
          <h2 className="text-xl font-semibold capitalize">
            {userData?.username}
          </h2>
          <p className="text-muted-foreground">{userData?.email}</p>
          <p className="text-sm font-medium capitalize text-blue-600">
            {userData?.role}
          </p>
        </div>

        <Button asChild className="mt-4 w-[12rem]">
          <Link href="/profile/edit-profile">Edit Profile</Link>
        </Button>
      </div>

      {/* Organizer Details */}
      {isOrganizer && (
        <Card className="mt-8 w-[90%] max-w-3xl mx-auto shadow-md">
          <CardHeader className="font-semibold text-lg">
            Organizer Details
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong>Organization Name:</strong> {userData?.organizationName}
            </p>
            <p>
              <strong>Phone Number:</strong> {userData?.phoneNumber}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={userData?.organizationURL}
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                {userData?.organizationURL}
              </a>
            </p>
          </CardContent>
        </Card>
      )}

      {/* Events Section */}
      <div className="w-[90%] max-w-5xl mx-auto mt-10">
        <h3 className="text-xl font-semibold mb-4">
          {isOrganizer ? "Your Created Events" : "Your Joined Events"}
        </h3>
        <Button
          className="mb-10"
          onClick={() => {
            router.push("/event/create");
          }}
        >
          Create Event
        </Button>

        {events && events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event: Event) => (
              <Card key={event._id}>
                <CardHeader>{event.name}</CardHeader>
                <CardContent>
                  <Image
                    src={event.banner?.secure_url ?? "/placeholder.jpg"}
                    alt={event.name}
                    width={400}
                    height={200}
                    className="rounded-md object-cover"
                  />
                  <p className="text-sm mt-2 text-muted-foreground">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p>{event.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
