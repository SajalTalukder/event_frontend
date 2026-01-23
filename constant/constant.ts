import {
  BarChart2,
  Bell,
  Calendar,
  Home,
  LogOut,
  Plus,
  Settings,
  User,
  Users,
} from "lucide-react";

export const baseLinks = [
  { id: 1, url: "/", label: "Home" },
  { id: 2, url: "/events", label: "Events" },
  { id: 3, url: "/about", label: "About" },
  { id: 4, url: "/contact", label: "Contact" },
];

export const participantLinks = [
  { id: 5, url: "/profile", label: "Registerd Event" },
];

export const organizerLinks = [
  { id: 6, url: "/dashboard/create-event", label: "Create Event" },
  { id: 7, url: "/dashboard/my-events", label: "My Events" },
];

export const mainMenu = [
  { label: "Dashboard", href: "/dashboard", Icon: Home },
  {
    label: "My Events",
    href: "/dashboard/my-events",
    Icon: Calendar,
  },
  { label: "Create Event", href: "/dashboard/create-event", Icon: Plus },
  { label: "Analytics", href: "/dashboard/analytics", Icon: BarChart2 },
  {
    label: "Attendees",
    href: "/dashboard/attendees",
    Icon: Users,
  },

  { label: "Profile", href: "/dashboard/profile", Icon: User },
];

export const accountMenu = [
  {
    label: "Notifications",
    href: "/dashboard/notifications",
    Icon: Bell,
    badge: 3,
  },
  { label: "Settings", href: "/dashboard/settings", Icon: Settings },
  { label: "Logout", href: "/logout", Icon: LogOut },
];
