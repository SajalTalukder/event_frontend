"use client";
import { RootState } from "@/store/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { LoadingButton } from "@/components/Helper/LoadingButton";
import axios from "axios";
import { BASE_API_URL } from "@/server";
import { handleRequest } from "@/components/utils/apiRequest";
import { toast } from "sonner";
import { setAuthUser } from "@/store/authSlice";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  // Personal info state
  const [username, setUername] = useState(user?.username || "");
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState(
    user?.profilePhoto?.secure_url || ""
  );
  const [organizationName, setOrganizationName] = useState(
    user?.organizationName || ""
  );
  const [organizationURL, setOrganizationURL] = useState(
    user?.organizationURL || ""
  );
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");

  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Status & error state
  const [infoLoading, setInfoLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);
    if (user?.role === "organizer") {
      formData.append("organizationName", organizationName);
      formData.append("organizationURL", organizationURL);
      formData.append("phoneNumber", phoneNumber);
    }

    const infoUpdateReq = async () =>
      await axios.patch(`${BASE_API_URL}/users/update-profile`, formData, {
        withCredentials: true,
      });

    const result = await handleRequest(infoUpdateReq, setInfoLoading);

    if (result) {
      // Handle successful response
      dispatch(setAuthUser(result.data.data.user));
      console.log(result.data.data.user);

      toast.success("Profile updated successfully!");
      // Update preview image if profile photo was changed
    }
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      currentPassword,
      newPassword,
      newPasswordConfirm: confirmPassword,
    };

    const passwordUpdateReq = async () =>
      await axios.patch(`${BASE_API_URL}/users/change-password`, data, {
        withCredentials: true,
      });

    const result = await handleRequest(passwordUpdateReq, setPasswordLoading);
    console.log(result);

    // if (result) {
    //   dispatch(setAuthUser(result.data.data.user));
    //   toast.success("Password updated successfully!");
    //   // Reset password fields
    //   setCurrentPassword("");
    //   setNewPassword("");
    //   setConfirmPassword("");
    // }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md">
      <Button
        onClick={() => {
          router.push("/profile");
        }}
        size={"lg"}
        className="mb-10"
      >
        Go to Profile
      </Button>
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

      {/* Personal Info Form */}
      <form onSubmit={handleInfoSubmit} className="space-y-4 mb-8">
        <div>
          <label className="font-medium block mb-1">Name</label>
          <input
            value={username}
            onChange={(e) => setUername(e.target.value)}
            className="w-full border rounded-md px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="font-medium block mb-1">Profile Photo</label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden relative">
              {typeof previewSrc === "string" && previewSrc.trim() !== "" ? (
                <Image
                  src={previewSrc}
                  alt="Preview"
                  fill
                  className="object-cover rounded-full"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                  No Image
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="profile-upload"
                className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-block"
              >
                Choose Image
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="hidden"
              />
              {profilePhoto && (
                <p className="text-sm text-gray-600 mt-1">
                  {profilePhoto.name}
                </p>
              )}
            </div>
          </div>
        </div>

        {user?.role === "organizer" && (
          <>
            <div>
              <label className="font-medium block mb-1">
                Organization Name
              </label>
              <input
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                className="w-full border rounded-md px-4 py-2"
              />
            </div>
            <div>
              <label className="font-medium block mb-1">Organization URL</label>
              <input
                type="url"
                value={organizationURL}
                onChange={(e) => setOrganizationURL(e.target.value)}
                className="w-full border rounded-md px-4 py-2"
              />
            </div>
            <div>
              <label className="font-medium block mb-1">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border rounded-md px-4 py-2"
              />
            </div>
          </>
        )}

        {/* {infoMsg && <p className="text-green-600 font-medium">{infoMsg}</p>}
        <button
          type="submit"
          disabled={infoLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {infoLoading ? "Saving..." : "Update Profile"}
        </button> */}

        <LoadingButton type="submit" isLoading={infoLoading}>
          Update Info
        </LoadingButton>
      </form>

      {/* Password Change Form */}
      <form onSubmit={handlePasswordSubmit} className="space-y-4">
        <h3 className="text-xl font-semibold">Change Password</h3>

        <div>
          <label className="font-medium block mb-1">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        <div>
          <label className="font-medium block mb-1">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        <div>
          <label className="font-medium block mb-1">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-md px-4 py-2"
          />
        </div>

        <LoadingButton type="submit" isLoading={passwordLoading}>
          Change Password
        </LoadingButton>
      </form>
    </div>
  );
};

export default EditProfile;
