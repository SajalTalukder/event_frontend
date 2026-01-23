"use client";

import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";

import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Edit } from "lucide-react";
import { handleRequest } from "../utils/apiRequest";
import { setAuthUser } from "@/store/authSlice";
import Image from "next/image";
import { BASE_API_URL } from "@/server";
import { LoadingButton } from "../Helper/LoadingButton";

const EditProfile = () => {
  const organizer = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const dispatch = useDispatch();

  // ✅ Single object state for all fields
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    organizationName: "",
    organizationURL: "",
    profilePhoto: "",
  });

  // password state variables
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // other state variable
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // ✅ Populate initial data once organizer is available
  useEffect(() => {
    if (organizer) {
      setFormData({
        username: organizer.username || "",
        email: organizer.email || "",
        phoneNumber: organizer.phoneNumber || "",
        organizationName: organizer.organizationName || "",
        organizationURL: organizer.organizationURL || "",
        profilePhoto: organizer.profilePhoto?.secure_url || "",
      });
      setPreview(organizer.profilePhoto?.secure_url || null);
    }
  }, [organizer]);

  // ✅ Handle input change for all fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle image selection + preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", formData.username);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("organizationName", formData.organizationName);
    data.append("organizationURL", formData.organizationURL);
    if (selectedFile) data.append("profilePhoto", selectedFile);

    const updateReq = async () =>
      await axios.patch(`${BASE_API_URL}/users/update-profile`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
    const result = await handleRequest(updateReq, setLoading);
    if (result) {
      dispatch(setAuthUser(result.data.data.user));
      router.push("/dashboard/profile");
      toast.success("Profile updated successfully!");
    }
  };

  const passwordChangeHandler = async () => {
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
    if (result) {
      toast.success("Password update successfully");
      router.push("/dashboard/profile");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture */}
        <div className=" relative flex items-center flex-col  space-y-3">
          {preview ? (
            <Image
              src={preview}
              alt="Profile Preview"
              width={160}
              height={160}
              className="rounded-full w-40 h-40 border-4 border-blue-500 object-cover"
            />
          ) : (
            <div className="w-[120px] h-[120px] rounded-full bg-gray-200 border-4 border-blue-500" />
          )}
          <label
            htmlFor="profilePhoto"
            className="text-sm text-white absolute bottom-0 left-[55%] w-10 h-10 flex items-center flex-col rounded-full justify-center bg-blue-700 cursor-pointer font-medium"
          >
            <Edit />
          </label>
          <input
            type="file"
            id="profilePhoto"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter username"
          />
        </div>

        {/* Email (Read Only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full border border-gray-200 bg-gray-100 text-gray-500 rounded-lg px-4 py-2 cursor-not-allowed"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Organization Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Organization Name
          </label>
          <input
            type="text"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Organization URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Organization Website
          </label>
          <input
            type="text"
            name="organizationURL"
            value={formData.organizationURL}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <LoadingButton
          type="submit"
          isLoading={loading}
          className="w-full flex justify-center items-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Save Changes
        </LoadingButton>
      </form>

      <div>
        <h1 className="text-2xl font-bold mt-16 text-gray-900 mb-6">
          Change Password
        </h1>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <input
            type="password"
            name="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Organization Name */}
        <div className="mb-4 mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <input
            type="password"
            name="newpassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Organization URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmpassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <LoadingButton
          onClick={passwordChangeHandler}
          isLoading={passwordLoading}
          className="w-full mt-6 flex justify-center items-center bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          Change Password
        </LoadingButton>
      </div>
    </div>
  );
};

export default EditProfile;
