"use client";
import { RootState } from "@/store/store";
import { Building, Edit, Mail, Phone, User } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

const OrganizerProfile = () => {
  const organizer = useSelector((state: RootState) => state.auth.user);
  console.log(organizer);

  return (
    <div className=" p-6 w-full md:w-[70%] mx-auto mt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <Link href="/dashboard/profile/edit-profile">
          <button className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        </Link>
      </div>
      {/* Profile Header */}
      <div className="bg-white mt-10 rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 items-center space-x-6">
          <div>
            <Avatar className="w-28 h-28 border-4 border-blue-500 shadow-lg bg-gray-300">
              <AvatarImage src={organizer?.profilePhoto.secure_url} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {organizer?.username}
            </h2>
            <p className="text-gray-600 mb-1">{organizer?.organizationName}</p>
            <p className="text-gray-600 mb-1">{organizer?.phoneNumber}</p>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-white rounded-xl mt-10  shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Personal Information
        </h3>

        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>

            <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
              <User className="w-4 h-4 text-gray-400 mr-2" />
              {organizer?.username}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
              <Mail className="w-4 h-4 text-gray-400 mr-2" />
              {organizer?.email}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>

            <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
              <Phone className="w-4 h-4 text-gray-400 mr-2" />
              {organizer?.phoneNumber}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company
            </label>

            <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
              <Building className="w-4 h-4 text-gray-400 mr-2" />
              {organizer?.organizationName}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Website
            </label>

            {organizer?.organizationURL ? (
              <Link
                href={organizer.organizationURL}
                className="flex items-center px-4 py-2 bg-gray-50 rounded-lg"
              >
                <Building className="w-4 h-4 text-gray-400 mr-2" />
                {organizer.organizationURL}
              </Link>
            ) : (
              <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg text-gray-400">
                <Building className="w-4 h-4 text-gray-400 mr-2" />
                Not Provided
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerProfile;
