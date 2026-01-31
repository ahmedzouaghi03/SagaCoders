import { GlobalHeader } from "@/components/layout";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <GlobalHeader
        userRole="company"
        userName="TechCorp HR"
      />
      <main className="pt-16">{children}</main>
    </div>
  );
}
