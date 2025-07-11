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
  const shownRoutes = ["/", "/profile"];

  const showNavBar = shownRoutes.includes(pathname);

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
