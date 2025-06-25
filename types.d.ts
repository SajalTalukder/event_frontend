export type UserRole = "participant" | "organizer" | "admin";

export interface User {
  _id: string; // MongoDB-style ID
  username: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  profilePhoto: {
    secure_url: string; // URL of the banner image
    public_id: string; // Cloudinary public ID for the image
  };

  createdEvents?: Event[];
  registerdEvents?: Event[];

  // Optional fields depending on role
  organizationName: string;
  organizationURL: string;
  phoneNumber: string;
}

export type Event = {
  id: string; // optional if you're using it for creation
  name: string;
  banner: {
    secure_url: string; // URL of the banner image
    // public_id: string; // Cloudinary public ID for the image
  };
  description: string;
  price: number;
  date: Date | string;
  time: string;
  location: string;
  additionalInfo?: string;
  trainerName?: string;
  guest?: string;
  createdBy: User; // or `User` type if you're populating
  attendees?: User[]; // or `User[]` if populated
  createdAt?: Date;
  updatedAt?: Date;
};
