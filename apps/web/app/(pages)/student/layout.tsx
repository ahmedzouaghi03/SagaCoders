import { GlobalHeader } from "@/components/layout";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <GlobalHeader
        userRole="student"
        userName="Ahmed Benali"
      />
      <main className="pt-16">{children}</main>
    </div>
  );
}
