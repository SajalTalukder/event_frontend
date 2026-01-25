"use client";

import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if loading done and user not admin or not logged in
    if (!loading) {
      if (!user || user.role !== "organizer") {
        router.replace("/"); // client-side redirect
      }
    }
  }, [user, loading, router]);

  // While loading, show spinner
  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center flex-col">
        <Loader className="w-12 h-12 animate-spin mb-4" />
      </div>
    );
  }

  // **Important**: only render dashboard if user exists AND role is admin
  if (!user || user.role !== "organizer") {
    router.replace("/"); // ensure redirect
    return null; // prevents rendering while redirect happens
  }

  return (
    <div className="sm:flex min-h-screen">
      <Sidebar />
      <main className="flex-1 md:ml-[18rem] mx-auto p-6">{children}</main>
    </div>
  );
}
