import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  icon: React.ElementType;
  title: string;
  count?: number;
  linkText?: string;
  linkHref?: string;
}

export default function SectionHeader({
  icon: Icon,
  title,
  count,
  linkText,
  linkHref,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3D5EE1]/10 to-[#5F74FF]/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-[#3D5EE1]" />
        </div>
        <h2 className="text-[16px] font-semibold text-[#202C4B]">{title}</h2>
        {count !== undefined && (
          <span className="px-2 py-0.5 bg-[#E9EDF4] rounded-full text-[12px] font-medium text-[#515B73]">
            {count}
          </span>
        )}
      </div>

      {linkText && linkHref && (
        <Link
          href={linkHref}
          className="flex items-center gap-1 text-[13px] font-medium text-[#3D5EE1] hover:text-[#5F74FF] transition-colors"
        >
          {linkText}
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
