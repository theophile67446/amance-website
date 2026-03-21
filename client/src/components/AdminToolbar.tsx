import { Link, useLocation } from "wouter";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useTranslation } from "react-i18next";

export default function AdminToolbar() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const { t } = useTranslation();

  if (!user || user.role !== "admin") return null;

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/");
    }
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-9 bg-[#1A361D] flex items-center px-3 gap-4 shadow-md"
      role="toolbar"
      aria-label={t("admin.toolbar.brand")}
    >
      {/* Brand */}
      <span className="text-white/50 text-[10px] font-bold tracking-[0.2em] uppercase hidden sm:block">
        {t("admin.toolbar.brand")}
      </span>

      <div className="w-px h-4 bg-white/10 hidden sm:block" />

      {/* Dashboard link */}
      <Link
        href="/admin"
        className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-white/80 hover:text-white transition-colors"
      >
        <LayoutDashboard size={12} className="text-amance-green" />
        <span>{t("admin.toolbar.dashboard")}</span>
      </Link>

      {/* Spacer */}
      <div className="flex-1" />

      {/* User badge */}
      <div className="flex items-center gap-2 pr-2">
        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-[10px] font-bold text-white/60">{(user.name || user.email || "A").charAt(0).toUpperCase()}</span>
        </div>
        <span className="text-[11px] font-medium text-white/40 hidden md:block">
            {user.name || user.email}
        </span>
      </div>

      <div className="w-px h-4 bg-white/10" />

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/60 hover:text-red-400 transition-colors"
        aria-label={t("admin.toolbar.logout")}
      >
        <LogOut size={12} />
        <span className="hidden sm:block">{t("admin.toolbar.logout")}</span>
      </button>
    </div>
  );
}
