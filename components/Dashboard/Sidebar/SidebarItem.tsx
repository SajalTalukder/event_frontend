"use client";
import { handleRequest } from "@/components/utils/apiRequest";
import { BASE_API_URL } from "@/server";
import { setAuthUser } from "@/store/authSlice";
import axios from "axios";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

type Props = {
  href: string;
  Icon: LucideIcon;
  label: string;

  onLogout?: () => void;
};

const SidebarItem = ({ href, Icon, label }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const dispatch = useDispatch();

  const logoutHandler = async () => {
    const logoutRequest = async () =>
      await axios.post(
        `${BASE_API_URL}/users/logout`,
        {},
        { withCredentials: true }
      );
    const result = await handleRequest(logoutRequest);
    console.log(result);

    if (result) {
      // Clear user data from redux state management
      dispatch(setAuthUser(null));
      redirect("/");
    }
  };
  const commonClass = `flex items-center justify-between px-3 py-2 rounded-md ${
    isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 text-gray-800"
  }`;

  if (label.toLowerCase() === "logout") {
    // Render a button instead of Link for logout
    return (
      <div>
        <button
          onClick={logoutHandler}
          className={`${commonClass} w-full cursor-pointer`}
          type="button"
        >
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </div>
        </button>
      </div>
    );
  }

  // For other labels, render normal Link
  return (
    <div>
      <Link href={href} className={commonClass}>
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </div>
      </Link>
    </div>
  );
};

export default SidebarItem;
