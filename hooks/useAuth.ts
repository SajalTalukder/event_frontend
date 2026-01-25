"use client";

import { handleRequest } from "@/components/utils/apiRequest";
import { BASE_API_URL } from "@/server";
import { User } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // start as true

  useEffect(() => {
    const getMe = async () => {
      const getMeReq = async () =>
        axios.get(`${BASE_API_URL}/users/me`, { withCredentials: true });

      try {
        const result = await handleRequest(getMeReq, setLoading, {
          suppressUnauthorized: true, // optional if your handleRequest supports it
        });

        if (result?.data?.data?.user) {
          setUser(result.data.data.user);
        } else {
          setUser(null); // explicitly set null if not logged in
        }
      } catch (err) {
        setUser(null); // explicitly set null on error
      } finally {
        setLoading(false);
      }
    };

    getMe();
  }, []);

  return { user, loading };
};
