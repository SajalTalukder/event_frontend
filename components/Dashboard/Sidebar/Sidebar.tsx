"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Menu } from "lucide-react";

import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SidebarContent from "./SidebarContent";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden  p-4 border-b border-gray-200 bg-white">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="text-gray-800">
                  <Menu className="w-6 h-6" />
                </button>
                <p>Dashboard</p>
              </div>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 md:h-screen md:border-r fixed top-0 md:bg-white md:p-4">
        <SidebarContent />
      </div>
    </>
  );
}
