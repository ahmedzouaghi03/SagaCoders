import { CheckCircle2, Clock, Loader2, XCircle, Calendar, CalendarOff } from "lucide-react";

export const workModeConfig = {
  on_site: {
    label: "On-site",
    bg: "bg-[#E8F9E8]",
    text: "text-[#1ABE17]",
    dot: "bg-[#1ABE17]",
  },
  remote: {
    label: "Remote",
    bg: "bg-[#E8F4FF]",
    text: "text-[#3D5EE1]",
    dot: "bg-[#3D5EE1]",
  },
  hybrid: {
    label: "Hybrid",
    bg: "bg-[#FFF8E6]",
    text: "text-[#E5A000]",
    dot: "bg-[#E5A000]",
  },
};

export const internshipStatusConfig = {
  pending: {
    label: "Pending",
    bg: "bg-[#FFF8E6]",
    text: "text-[#E5A000]",
    icon: Clock,
    iconClass: "text-[#E5A000]",
  },
  approved: {
    label: "Approved",
    bg: "bg-[#E8F9E8]",
    text: "text-[#1ABE17]",
    icon: CheckCircle2,
    iconClass: "text-[#1ABE17]",
  },
  rejected: {
    label: "Rejected",
    bg: "bg-[#FDE9ED]",
    text: "text-[#E82646]",
    icon: XCircle,
    iconClass: "text-[#E82646]",
  },
  closed: {
    label: "Closed",
    bg: "bg-[#F4F6FA]",
    text: "text-[#6A7287]",
    icon: XCircle,
    iconClass: "text-[#6A7287]",
  },
};

export const applicationStatusConfig = {
  pending: {
    label: "Pending",
    bg: "bg-[#FFF8E6]",
    text: "text-[#E5A000]",
    icon: Loader2,
    iconClass: "text-[#E5A000]",
  },
  accepted: {
    label: "Accepted",
    bg: "bg-[#E8F9E8]",
    text: "text-[#1ABE17]",
    icon: CheckCircle2,
    iconClass: "text-[#1ABE17]",
  },
  rejected: {
    label: "Rejected",
    bg: "bg-[#FDE9ED]",
    text: "text-[#E82646]",
    icon: XCircle,
    iconClass: "text-[#E82646]",
  },
};

export const eventStatusConfig = {
  active: {
    label: "Active",
    bg: "bg-[#E8F9E8]",
    text: "text-[#1ABE17]",
    icon: Calendar,
    iconClass: "text-[#1ABE17]",
  },
  inactive: {
    label: "Inactive",
    bg: "bg-[#F4F6FA]",
    text: "text-[#6A7287]",
    icon: CalendarOff,
    iconClass: "text-[#6A7287]",
  },
};
