import { Link, useLocation } from "wouter";
import { LayoutDashboard, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

export default function AdminToolbar() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();

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
      className="fixed top-0 left-0 right-0 z-[60] h-9 bg-[#1A361D] flex items-center px-3 gap-4"
      role="toolbar"
      aria-label="Barre d'administration"
    >
      {/* Brand */}
      <span className="text-white/50 text-xs font-semibold tracking-widest uppercase hidden sm:block">
        AMANCE Admin
      </span>

      <div className="w-px h-4 bg-white/20 hidden sm:block" />

      {/* Dashboard link */}
      <Link
        href="/admin"
        className="flex items-center gap-1.5 text-xs font-medium text-white/80 hover:text-white transition-colors"
      >
        <LayoutDashboard size={13} />
        <span>Tableau de bord</span>
      </Link>

      {/* Spacer */}
      <div className="flex-1" />

      {/* User badge */}
      <span className="text-xs text-white/50 hidden md:block">
        {user.name || user.email}
      </span>

      <div className="w-px h-4 bg-white/20" />

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-red-300 transition-colors"
        aria-label="Déconnexion"
      >
        <LogOut size={13} />
        <span className="hidden sm:block">Déconnexion</span>
      </button>
    </div>
  );
}
