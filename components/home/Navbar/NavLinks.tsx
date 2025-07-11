import Link from "next/link";
import React from "react";

type Props = {
  navlinks: {
    id: number;
    url: string;
    label: string;
  }[];
};

const NavLinks = ({ navlinks }: Props) => {
  return (
    <div>
      {/* NAVLINKS */}
      <ul className="hidden lg:flex items-center space-x-8">
        {navlinks.map((link) => (
          <li key={link.id}>
            <Link
              href={link.url}
              className="text-base font-medium hover:text-cyan-700 dark:hover:text-cyan-300 relative group"
            >
              {link.label}
              <span className="block h-[2px] w-0 group-hover:w-full bg-cyan-700 dark:bg-cyan-300 transition-all duration-300"></span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavLinks;
