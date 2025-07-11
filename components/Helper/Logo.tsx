import Link from "next/link";
import React from "react";
import { MdEvent } from "react-icons/md";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="w-10 h-10 bg-cyan-800 dark:bg-white rounded-full flex items-center justify-center">
        <MdEvent className="w-5 h-5 text-white dark:text-black" />
      </div>
      <h1 className="text-xl md:text-2xl hidden sm:block font-bold text-cyan-800 dark:text-white">
        EventTvent
      </h1>
    </Link>
  );
};

export default Logo;
