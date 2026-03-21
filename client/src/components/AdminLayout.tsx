import { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";

interface AdminLayoutProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: ReactNode;
}

export default function AdminLayout({ activeTab, onTabChange, children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar activeTab={activeTab} onTabChange={onTabChange} />
      {/* Main content — offset by sidebar width on desktop */}
      <div className="flex-1 min-w-0 lg:pl-64 transition-all duration-300">
        {children}
      </div>
    </div>
  );
}
