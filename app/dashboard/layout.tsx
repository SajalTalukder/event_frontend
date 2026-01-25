import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BASE_API_URL } from "@/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ await cookies()!
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token")?.value;

  if (!tokenCookie) redirect("/"); // no token → redirect

  // Construct Cookie header for backend
  const cookieHeader = `token=${tokenCookie}`;

  // Fetch user server-side
  const res = await fetch(`${BASE_API_URL}/users/me`, {
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (!res.ok) redirect("/"); // failed fetch → redirect

  const data = await res.json();
  const user = data?.data?.user;
  console.log(user);

  if (!user || user.role !== "organizer") redirect("/"); // not admin → redirect

  return (
    <div className="sm:flex min-h-screen">
      <Sidebar />
      <main className="flex-1 md:ml-[18rem] mx-auto p-6">{children}</main>
    </div>
  );
}
