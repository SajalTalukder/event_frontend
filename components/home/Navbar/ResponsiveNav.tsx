"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
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

  // Only show navbar on these routes
  const shownRoutes = [
    "/",
    "/profile",
    "/events",
    "/events/details/", // dynamic route base path without [id]
    "/about",
    "/contact",
  ];

  const showNavBar = shownRoutes.some(
    (route) => pathname === route || pathname.startsWith(route)
  );

  if (!showNavBar) return null;
  console.log(user);

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
