import { accountMenu, mainMenu } from "@/constant/constant";
import Link from "next/link";
import React from "react";
import SidebarItem from "./SidebarItem";

const SidebarContent = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      {/* Top Logo */}
      <div>
        <div className="flex items-center space-x-2 mb-6 px-2">
          <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 p-2 rounded-full">
            <span className="text-white font-bold">⚡</span>
          </div>
          <Link href="/" className="flex flex-col">
            <h1 className="font-bold text-lg">EventPro</h1>
            <p className="text-xs text-gray-500">Organizer Dashboard</p>
          </Link>
        </div>

        <p className="text-xs text-gray-400 uppercase mt-10 px-3 mb-2">
          Main Menu
        </p>
        <nav className="flex flex-col gap-3">
          {mainMenu.map((item) => (
            <SidebarItem key={item.href} {...item} />
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div>
        <p className="text-xs text-gray-400 uppercase px-3 mb-2">Account</p>
        <nav className="flex flex-col gap-1 mb-2">
          {accountMenu.map((item) => (
            <SidebarItem key={item.href} {...item} />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SidebarContent;
