"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import Nav from "./Nav";
import MobileNav from "./MobileNav";

import {
  baseLinks,
  organizerLinks,
  participantLinks,
} from "@/constant/constant";

const ResponsiveNav = () => {
  const [showNav, setShowNav] = useState(false);
  const pathname = usePathname();

  const openNavHandler = () => setShowNav(true);
  const closeNavHandler = () => setShowNav(false);

  const user = useSelector((state: RootState) => state.auth.user);

  const getNavLinks = () => {
    if (!user) return baseLinks;
    if (user.role === "organizer") return [...baseLinks, ...organizerLinks];
    return [...baseLinks, ...participantLinks];
  };

  const NavLinks = getNavLinks();

  // ❌ Routes where you do NOT want to show the nav (denylist)
  const hiddenRoutes = ["/dashboard", "/auth"];

  // Check if current path starts with any route in the hiddenRoutes list
  const hideNavBar = hiddenRoutes.some((route) => pathname.startsWith(route));

  if (hideNavBar) return null;

  return (
    <>
      <Nav openNav={openNavHandler} navlinks={NavLinks} user={user} />
      <MobileNav
        showNav={showNav}
        closeNav={closeNavHandler}
        navlinks={NavLinks}
      />
    </>
  );
};

export default ResponsiveNav;
