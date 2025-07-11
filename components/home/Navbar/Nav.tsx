"use client";

import Logo from "@/components/Helper/Logo";

import { User } from "@/types";

import React, { useEffect, useState } from "react";

import NavLinks from "./NavLinks";
import NavButtons from "./NavButtons";

type Props = {
  openNav: () => void;
  navlinks: {
    id: number;
    url: string;
    label: string;
  }[];
  user: User | null;
};

const Nav = ({ openNav, navlinks, user }: Props) => {
  const [navBg, setNavBg] = useState(false);

  useEffect(() => {
    const handler = () => {
      setNavBg(window.scrollY >= 90);
    };

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`transition-all duration-200 h-[12vh] z-[10000] shadow-sm fixed w-full ${
        navBg ? "bg-white/90 dark:bg-gray-900  backdrop-blur" : ""
      }`}
    >
      <div className="flex items-center h-full justify-between w-[92%] mx-auto">
        {/* LOGO */}
        <Logo />

        {/* NavLinks */}
        <NavLinks navlinks={navlinks} />

        {/* RIGHT SIDE */}
        <NavButtons user={user} openNav={openNav} />
      </div>
    </nav>
  );
};

export default Nav;
