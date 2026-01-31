import { GlobalHeader } from "@/components/layout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <GlobalHeader
        userRole="admin"
        userName="Admin User"
      />
      <main className="pt-16">{children}</main>
    </div>
  );
}
