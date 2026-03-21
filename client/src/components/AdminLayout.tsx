import { ReactNode, useState } from "react";
import AdminSidebar from "./AdminSidebar";

interface AdminLayoutProps {
  children: (activeTab: string, setActiveTab: (tab: string) => void) => ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      {/* Main content — offset by sidebar width on desktop */}
      <div className="flex-1 min-w-0 lg:pl-64 transition-all duration-300">
        {children(activeTab, setActiveTab)}
      </div>
    </div>
  );
}
