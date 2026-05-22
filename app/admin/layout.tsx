import type { ReactNode } from "react";
import AdminSidebarNav from "@/components/admin/admin-sidebar-nav";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen xl:grid xl:grid-cols-[300px_minmax(0,1fr)] xl:gap-8">
      <aside className="hidden xl:block xl:px-6 xl:py-8">
        <div className="sticky top-24">
          <AdminSidebarNav />
        </div>
      </aside>

      <div className="xl:min-w-0">
        <div className="sticky top-[72px] z-30 border-b border-white/8 bg-[rgba(7,10,14,0.82)] backdrop-blur-xl xl:hidden">
          <AdminSidebarNav mobile />
        </div>
        {children}
      </div>
    </div>
  );
}
