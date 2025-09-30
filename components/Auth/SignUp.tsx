"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LoadingButton } from "../Helper/LoadingButton";
import PasswordInput from "./PasswordInput";
import { cn } from "@/lib/utils";
import axios from "axios";
import { handleRequest } from "../utils/apiRequest";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/store/authSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BASE_API_URL } from "@/server";

const SignUp = () => {
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Dispatch for redux
  const dispatch = useDispatch();

  // Router to redirect
  const router = useRouter();

  // Form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "",
    phoneNumber: "",
    organizationName: "",
    organizationURL: "",
  });

  // check for participent or organizer
  const isOrganizer = formData.role === "organizer";

  // Inpute change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Special logic when changing role
    if (name === "role") {
      if (value === "participant") {
        setFormData((prev) => ({
          ...prev,
          role: value,
          phone: "",
          orgName: "",
          orgUrl: "",
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          role: value,
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Form submit functionality (Signup process)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const signupRequest = async () =>
      await axios.post(`${BASE_API_URL}/users/signup`, formData, {
        withCredentials: true,
      });

    const result = await handleRequest(signupRequest, setIsLoading);
    if (result) {
      const user = result.data.data.user;
      dispatch(setAuthUser(user));

      if (user.role === "organizer") {
        router.push("/auth/verify");
        toast.success(result.data.message);
      } else {
        router.push("/");
        toast.success("Registration Successfull!");
      }
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full max-w-2xl mx-auto min-h-screen",
        isOrganizer ? "mt-10 mb-10" : "mt-0 mb-0"
      )}
    >
      <h1 className="font-bold text-xl sm:text-2xl text-left uppercase mb-8">
        Sign Up with{" "}
        <span
          onClick={() => {
            router.push("/");
          }}
          className="text-rose-600 underline cursor-pointer"
        >
          EventPro
        </span>
      </h1>

      <form onSubmit={handleSubmit} className="w-full px-4">
        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username" className="font-semibold mb-2 block">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
            className="px-4 py-3 bg-gray-200 rounded-lg w-full outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="font-semibold mb-2 block">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email address"
            required
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-3 bg-gray-200 rounded-lg w-full outline-none"
          />
        </div>

        {/* Role Selection */}
        <div className="mb-4">
          <label htmlFor="role" className="font-semibold mb-2 block">
            Sign Up As
          </label>
          <select
            id="role"
            name="role"
            required
            value={formData.role}
            onChange={handleChange}
            className="px-4 py-3 bg-gray-200 rounded-lg w-full outline-none"
          >
            <option value="">-- Select Role --</option>
            <option value="participant">Participant</option>
            <option value="organizer">Organizer</option>
          </select>
        </div>

        {/* Organizer Specific Fields */}
        {isOrganizer && (
          <>
            <div className="mb-4">
              <label htmlFor="phone" className="font-semibold mb-2 block">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="px-4 py-3 bg-gray-200 rounded-lg w-full outline-none"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="organizationName"
                className="font-semibold mb-2 block"
              >
                Organization Name
              </label>
              <input
                id="orgName"
                type="text"
                name="organizationName"
                placeholder="Organization Name"
                value={formData.organizationName}
                onChange={handleChange}
                className="px-4 py-3 bg-gray-200 rounded-lg w-full outline-none"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="orgUrl" className="font-semibold mb-2 block">
                Organization URL
              </label>
              <input
                id="orgUrl"
                type="url"
                name="organizationURL"
                placeholder="https://your-org.com"
                value={formData.organizationURL}
                onChange={handleChange}
                className="px-4 py-3 bg-gray-200 rounded-lg w-full outline-none"
              />
            </div>
          </>
        )}

        {/* Password */}
        <div className="mb-4">
          <PasswordInput
            label="Password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <PasswordInput
            label="Confirm Password"
            name="passwordConfirm"
            placeholder="Confirm password"
            value={formData.passwordConfirm}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <LoadingButton
          size="lg"
          className="w-full mt-3"
          isLoading={isLoading}
          type="submit"
        >
          Sign Up Now
        </LoadingButton>
      </form>

      {/* Login Redirect */}
      <h1 className="mt-4 text-lg text-gray-800">
        Already have an account?{" "}
        <Link href="/auth/login">
          <span className="text-blue-800 underline cursor-pointer font-medium">
            Login Here
          </span>
        </Link>
      </h1>
    </div>
  );
};

export default SignUp;
