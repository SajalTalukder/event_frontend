"use client";
import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import LatestEvents from "./LatestEvents";
import Feature from "./Feature";
import Cta from "./Cta";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_API_URL } from "@/server";
import { handleRequest } from "../utils/apiRequest";
import { setAuthUser } from "@/store/authSlice";
import { Loader } from "lucide-react";

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);
  useEffect(() => {
    const getMe = async () => {
      const getMeReq = async () =>
        axios.get(`${BASE_API_URL}/users/me`, { withCredentials: true });

      const result = await handleRequest(getMeReq, setIsLoading, {
        suppressUnauthorized: true, // <-- custom option
      });

      if (result?.data?.data?.user) {
        dispatch(setAuthUser(result.data.data.user));
      } else {
        dispatch(setAuthUser(null)); // user not logged in
      }
    };

    getMe();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden">
      <Hero />
      <LatestEvents />
      <Feature />
      <Cta />
      <Footer />
    </div>
  );
};

export default Home;
