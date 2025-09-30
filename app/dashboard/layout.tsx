import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import { BASE_API_URL } from "@/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies(); // ✅ await this
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.log("⛔ No token. Redirecting to /login");
    redirect("/auth/login");
  }

  try {
    const res = await fetch(`${BASE_API_URL}/users/me`, {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("⛔ /me route failed:", res.status);
      redirect("/auth/login");
    }

    const data = await res.json();

    const user = data?.data?.user;

    if (!user) {
      redirect("/auth/login");
    }

    if (user.role !== "organizer") {
      redirect("/");
    }

    if (user.role === "organizer") {
      redirect("/dashboard");
    }

    return (
      <div className="sm:flex min-h-screen">
        <Sidebar />
        <main className="flex-1 md:ml-[18rem]  mx-auto  p-6">{children}</main>
      </div>
    );
  } catch (err) {
    console.error("❌ Error while fetching user in layout:", err);
    redirect("/");
  }
}
