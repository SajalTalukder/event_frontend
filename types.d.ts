export type UserRole = "user" | "organizer" | "admin";

export interface User {
  _id: string; // MongoDB-style ID
  username: string;
  email: string;
  role: UserRole;
  isVerified: boolean;

  // Optional fields depending on role
  phone?: string; // Organizer only
  orgName?: string;
  orgUrl?: string;
}
