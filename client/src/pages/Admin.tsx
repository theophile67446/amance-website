import { useMemo, useState } from "react";
import { useLocation } from "wouter";

import { useAuth } from "@/_core/hooks/useAuth";
import LocalLogin from "@/components/LocalLogin";
import AdminLayout from "@/components/AdminLayout";
import {
  AdminDashboardPage,
  AdminArticlesPage,
  AdminProjectsPage,
  AdminTeamPage,
  AdminContactsPage,
  AdminRegistrationsPage,
} from "@/components/admin/AdminModulePages";
import { parseAdminLocation, isAdminSection, buildAdminPath } from "@/components/admin/adminRouting";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Admin() {
  const { user } = useAuth();
  const [location, navigate] = useLocation();
  const [message, setMessage] = useState("");

  const route = useMemo(() => parseAdminLocation(location), [location]);

  if (!user || user.role !== "admin") {
    return <LocalLogin />;
  }

  const handleTabChange = (tab: string) => {
    if (!isAdminSection(tab)) return;
    navigate(buildAdminPath(tab, tab === "dashboard" ? "dashboard" : "list"));
  };

  return (
    <AdminLayout activeTab={route.section} onTabChange={handleTabChange}>
      {message && (
        <div className="fixed bottom-4 right-4 z-[120] max-w-sm">
          <Alert className="border-emerald-200 bg-emerald-50 text-emerald-900 shadow-lg">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        </div>
      )}

      {route.section === "dashboard" && <AdminDashboardPage navigate={navigate} />}
      {route.section === "articles" && <AdminArticlesPage route={route} navigate={navigate} setMessage={setMessage} />}
      {route.section === "projets" && <AdminProjectsPage route={route} navigate={navigate} setMessage={setMessage} />}
      {route.section === "equipe" && <AdminTeamPage route={route} navigate={navigate} setMessage={setMessage} />}
      {route.section === "contacts" && <AdminContactsPage route={route} navigate={navigate} setMessage={setMessage} />}
      {route.section === "registrations" && <AdminRegistrationsPage route={route} navigate={navigate} setMessage={setMessage} />}
    </AdminLayout>
  );
}
