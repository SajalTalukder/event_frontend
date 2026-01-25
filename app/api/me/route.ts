// app/api/me/route.ts (Next.js 16 App Router)
import { NextResponse } from "next/server";
import { BASE_API_URL } from "@/server";

export async function GET(req: Request) {
  // Read the token cookie from the incoming request
  const cookie = req.headers.get("cookie"); // all cookies in one string

  if (!cookie || !cookie.includes("token=")) {
    return NextResponse.json(
      { status: "fail", message: "Unauthorized" },
      { status: 401 },
    );
  }

  // Forward the request to your backend
  const res = await fetch(`${BASE_API_URL}/users/me`, {
    headers: {
      Cookie: cookie, // pass the cookie to backend
    },
    credentials: "include", // optional
  });

  if (!res.ok) {
    return NextResponse.json(
      { status: "fail", message: "Unauthorized" },
      { status: 401 },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
