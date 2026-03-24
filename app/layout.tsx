import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ClientProvider from "@/components/hoc/ClientProvider";
import ResponsiveNav from "@/components/home/Navbar/ResponsiveNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eventa - Event Management Platform",
  description:
    "Eventa is a comprehensive event management platform designed to streamline the planning and execution of events, from small gatherings to large conferences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProvider>
          <ResponsiveNav />
          {children}
          <Toaster position="top-center" />
        </ClientProvider>
      </body>
    </html>
  );
}
