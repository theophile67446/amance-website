import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Mail,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

const NAV_ITEMS = [
  { id: "dashboard", label: "Vue d'ensemble", icon: LayoutDashboard },
  { id: "articles", label: "Actualités & Articles", icon: FileText },
  { id: "projets", label: "Projets & Missions", icon: Briefcase },
  { id: "contacts", label: "Messages", icon: Mail },
  { id: "registrations", label: "Bénévoles & Partenaires", icon: Users },
  { id: "equipe", label: "Équipe", icon: Users },
];

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/");
    }
  };

  const handleTabChange = (id: string) => {
    onTabChange(id);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className={`flex items-center border-b border-white/10 flex-shrink-0 ${collapsed ? "justify-center px-3 py-4" : "justify-between px-4 py-4"
          }`}
      >
        {!collapsed && (
          <Link
            href="/"
            className="flex items-center gap-2 group"
            title="Retour au site"
          >
            <img
              src="/logo.png"
              alt="AMANCE"
              className="h-8 w-8 object-contain flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://d2xsxph8kpxj0f.cloudfront.net/310519663349492546/QAH5oD3g9NaLpXrMvyrp4h/amance-logo_b61079fb.webp";
              }}
            />
            <span className="text-white font-extrabold text-lg leading-tight font-heading">
              AMANCE
            </span>
          </Link>
        )}
        {collapsed && (
          <Link href="/" title="Retour au site">
            <img
              src="/logo.png"
              alt="AMANCE"
              className="h-8 w-8 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://d2xsxph8kpxj0f.cloudfront.net/310519663349492546/QAH5oD3g9NaLpXrMvyrp4h/amance-logo_b61079fb.webp";
              }}
            />
          </Link>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex-shrink-0"
          aria-label={collapsed ? "Déplier le menu" : "Replier le menu"}
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>

      {/* Admin label */}
      {!collapsed && (
        <div className="px-4 py-2 flex-shrink-0">
          <span className="text-xs font-semibold text-white/40 uppercase tracking-widest">
            Administration
          </span>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => handleTabChange(id)}
              title={collapsed ? label : undefined}
              className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 group ${isActive
                ? "bg-white/20 text-white shadow-sm"
                : "text-white/70 hover:bg-white/10 hover:text-white"
                } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon
                size={18}
                className={`flex-shrink-0 transition-transform duration-150 group-hover:scale-110 ${isActive ? "text-white" : "text-white/60"
                  }`}
              />
              {!collapsed && <span className="truncate">{label}</span>}
              {!collapsed && isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Return to site link */}
      <div className="px-2 flex-shrink-0">
        <Link
          href="/"
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all duration-150 group ${collapsed ? "justify-center" : ""
            }`}
          title={collapsed ? "Retour au site" : undefined}
        >
          <ExternalLink
            size={18}
            className="flex-shrink-0 transition-transform duration-150 group-hover:scale-110"
          />
          {!collapsed && <span>Retour au site</span>}
        </Link>
      </div>

      {/* User profile + logout */}
      <div className="border-t border-white/10 px-2 py-3 flex-shrink-0">
        {!collapsed && user && (
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">
                {(user.name || user.email || "A").charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">
                {user.name || user.email}
              </p>
              <p className="text-white/50 text-xs">Administrateur</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          title={collapsed ? "Déconnexion" : undefined}
          className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-red-500/20 hover:text-red-300 transition-all duration-150 group ${collapsed ? "justify-center" : ""
            }`}
        >
          <LogOut
            size={18}
            className="flex-shrink-0 transition-transform duration-150 group-hover:scale-110"
          />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-40 bg-[#1A361D] transition-all duration-300 ease-in-out ${collapsed ? "w-16" : "w-64"
          }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile: hamburger button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-xl bg-[#1A361D] text-white shadow-lg"
        aria-label="Ouvrir le menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile: overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile: drawer */}
      <aside
        className={`lg:hidden fixed left-0 top-0 bottom-0 z-50 w-72 bg-[#1A361D] transform transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-3 w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Fermer le menu"
        >
          <X size={16} />
        </button>
        {sidebarContent}
      </aside>
    </>
  );
}
