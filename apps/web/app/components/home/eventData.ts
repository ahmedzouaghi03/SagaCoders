// Event data type matching the database schema
export interface EventData {
  id: number;
  name: string;
  description: string | null;
  slogan: string | null;
  year: number;
  startDate: Date;
  endDate: Date;
  location: string | null;
  isActive: boolean;
  images: {
    logo: string | null;
    banner: string | null;
    gallery: string[];
  };
}

// Static event data - will be replaced with database fetch
export const currentEvent: EventData = {
  id: 1,
  name: "FEEE",
  description: "Forum Études Entreprises ENSIAS – The premier internship event connecting students with top companies",
  slogan: "Where Talent Meets Opportunity – Build Your Future Today",
  year: 2026,
  startDate: new Date("2026-03-15"),
  endDate: new Date("2026-03-20"),
  location: "ENSIAS, Rabat",
  isActive: true,
  images: {
    logo: "/images/event/logo.png", // Replace with actual logo path
    banner: "/images/event/banner.jpg", // Replace with actual banner path
    gallery: [],
  },
};
