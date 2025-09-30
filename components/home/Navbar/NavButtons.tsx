"use client";
import { User } from "@/types";
import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { HiBars3BottomRight } from "react-icons/hi2";
import axios from "axios";
import { handleRequest } from "@/components/utils/apiRequest";
import { BASE_API_URL } from "@/server";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/store/authSlice";
import { Button } from "@/components/ui/button";

type Props = {
  user: User | null;
  openNav: () => void;
};

const NavButtons = ({ user, openNav }: Props) => {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    const logoutRequest = async () =>
      await axios.post(
        `${BASE_API_URL}/users/logout`,
        {},
        { withCredentials: true }
      );
    const result = await handleRequest(logoutRequest);
    if (result) {
      // Clear user data from redux state management
      dispatch(setAuthUser(null));
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-4">
        {/* Unauthenticated */}
        {!user?._id && (
          <Link href="/auth/login">
            <Button size={"lg"}>Login / Register</Button>
          </Link>
        )}

        {/* Authenticated */}
        {user?._id && (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center lg:space-x-2 cursor-pointer outline-none">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.profilePhoto?.secure_url} />
                <AvatarFallback>
                  {user.username?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="hidden lg:block font-medium text-base">
                {user.username}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="z-[100001]">
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              {user.role === "organizer" && (
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/my-events">My Events</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={logoutHandler}
                asChild
                className="cursor-pointer"
              >
                <button className="w-full">Logout</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Mobile Menu Icon */}
        <HiBars3BottomRight
          onClick={openNav}
          className="w-8 h-8 cursor-pointer text-black dark:text-white lg:hidden"
        />
      </div>
    </div>
  );
};

export default NavButtons;
