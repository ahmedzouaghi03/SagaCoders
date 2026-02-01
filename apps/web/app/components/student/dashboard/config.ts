import { CheckCircle2, Loader2, XCircle } from "lucide-react";

export const workModeConfig = {
  on_site: {
    label: "On-site",
    bg: "bg-[#E8F9E8]",
    text: "text-[#1ABE17]",
    dot: "bg-[#1ABE17]",
  },
  remote: {
    label: "Remote",
    bg: "bg-[#E8F9E8]",
    text: "text-[#1ABE17]",
    dot: "bg-[#1ABE17]",
  },
  hybrid: {
    label: "Hybrid",
    bg: "bg-[#FDE9ED]",
    text: "text-[#E82646]",
    dot: "bg-[#E82646]",
  },
};

export const statusConfig = {
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
