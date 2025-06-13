"use client";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user);

  return <div>HOME</div>;
};

export default HomePage;
